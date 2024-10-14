import "server-only";

import { Client, Account, Storage, Users, Databases } from "node-appwrite";
import { APPWRITE_ENDPOINT, APPWRITE_KEY, APPWRITE_PROJECT } from "@/config";

export async function createAdminClient() {

    const client = new Client()
        .setEndpoint(APPWRITE_ENDPOINT)
        .setProject(APPWRITE_PROJECT)
        .setKey(APPWRITE_KEY);

    return {
        get account() {
            return new Account(client);
        },
    };
};