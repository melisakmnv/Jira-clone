import { redirect } from "next/navigation"

import { getCurrent } from "@/features/auth/actions"
import { getWorkspaces } from "@/features/workspaces/actions";

import { SignUpCard } from "@/features/auth/components/sign-up-card"

const SignUpPage = async () => {

    // ROUTE PROTECTION //
    const user = await getCurrent()

    const workspaces = await getWorkspaces();
    if (user && workspaces.total === 0) redirect("/workspaces/create")


    return <SignUpCard />

};

export default SignUpPage;