import { Account, Client, Databases, Query } from "node-appwrite";
import { cookies } from "next/headers";

import { AUTH_COOKIE } from "@/features/auth/constants";

import { APPWRITE_ENDPOINT, APPWRITE_PROJECT, DATABASES_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";

export const getWorkspaces = async () => {

    try {

        const client = new Client()
            .setEndpoint(APPWRITE_ENDPOINT)
            .setProject(APPWRITE_PROJECT)

        const session = await cookies().get(AUTH_COOKIE)

        if (!session) return { documents: [], total: 0 };

        client.setSession(session.value)

        const databases = new Databases(client);
        const account = new Account(client);

        const user = await account.get();

        const members = await databases.listDocuments(
            DATABASES_ID,
            MEMBERS_ID,
            [Query.equal("userId", user.$id)]
        );

        if (members.total === 0) return { documents: [], total: 0 };
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

        return workspaces;

    } catch {
        return { documents: [], total: 0 }
    }
};