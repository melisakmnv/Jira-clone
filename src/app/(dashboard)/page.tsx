import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
import { getWorkspaces } from "@/features/workspaces/actions";



// async can not be use in "use client", this component is now server component //
export default async function Home() {

    // ROUTE PROTECTION //
    const user = await getCurrent()
    if (!user) redirect("/sign-in");

    const workspaces = await getWorkspaces();
    if (workspaces.total === 0) redirect("/workspaces/create")
    else redirect(`/workspaces/${workspaces.documents[0].$id}`)
};
