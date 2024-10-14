import { Account, Client } from "node-appwrite";
import { cookies } from "next/headers";

import { AUTH_COOKIE } from "./constants";
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT } from "@/config";

export const getCurrent = async () => {

    try {

        const client = new Client()
            .setEndpoint(APPWRITE_ENDPOINT)
            .setProject(APPWRITE_PROJECT)

        const session = await cookies().get(AUTH_COOKIE)

        if (!session) return null;

        client.setSession(session.value)
        const accout = new Account(client);

        return await accout.get();


    } catch {
        return null
    }
};