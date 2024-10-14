import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { zValidator } from "@hono/zod-validator";

import { MemberRole } from "@/features/members/types";

import { DATABASES_ID, IMAGES_BUCKET_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";

import { createWorkspaceSchema } from "../schema";
import { use } from "react";

const app = new Hono()

    // GET WORKSPACES // 
    .get(
        "/",
        sessionMiddleware,
        async (c) => {

            // GET ONLY WORKSPACE WE OWN //
            const user = c.get("user")
            const databases = c.get("databases");

            // GET ONLY WORKSPACE WE OWN //
            const members = await databases.listDocuments(
                DATABASES_ID,
                MEMBERS_ID,
                [Query.equal("userId", user.$id)]
            );

            if (members.total === 0) return c.json({ data: { documents: [], total: 0 } })

            // Return member workspaceIds 
            const workspaceIds = members.documents.map((member) => member.workspaceId)

            const workspaces = await databases.listDocuments(
                DATABASES_ID,
                WORKSPACES_ID,
                [
                    Query.orderDesc("$createdAt"),
                    Query.contains("$id", workspaceIds)
                ]
            );

            return c.json({ data: workspaces })
        }
    )

    // POST NEW WORKSPACE //
    .post(
        "/",
        zValidator("form", createWorkspaceSchema),
        sessionMiddleware,
        async (c) => {

            const databases = c.get("databases");
            const storage = c.get("storage");
            const user = c.get("user");

            const { name, image } = c.req.valid("form");

            let uploadedImageUrl: string | undefined;

            if (image instanceof File) {
                const file = await storage.createFile(
                    IMAGES_BUCKET_ID,
                    ID.unique(),
                    image
                );

                // Transform to base64
                const arrayBuffer = await storage.getFilePreview(
                    IMAGES_BUCKET_ID,
                    file.$id
                );

                // Extract uploaded image url
                uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;

            }

            const workspace = await databases.createDocument(
                DATABASES_ID,
                WORKSPACES_ID,
                ID.unique(),
                {
                    name,
                    userId: user.$id,
                    imageUrl: uploadedImageUrl,
                }
            );

            // CREATE MEMBER //

            await databases.createDocument(
                DATABASES_ID,
                MEMBERS_ID,
                ID.unique(),
                {
                    userId: user.$id,
                    workspaceId: workspace.$id,
                    role: MemberRole.ADMIN
                }
            );

            return c.json({ data: workspace })
        }
    );

export default app;