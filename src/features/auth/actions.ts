import { Account, Client } from "node-appwrite";
import { cookies } from "next/headers";

import { AUTH_COOKIE } from "./constants";

export const getCurrent = async () => {

    try {

        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)

        const session = await cookies().get(AUTH_COOKIE)

        if (!session) return null;

        client.setSession(session.value)
        const accout = new Account(client);

        return await accout.get();


    } catch {
        return null
    }
};