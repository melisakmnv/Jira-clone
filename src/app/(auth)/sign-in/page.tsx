import { redirect } from "next/navigation"

import { getCurrent } from "@/features/auth/actions"
import { SignInCard } from "@/features/auth/components/sign-in-card"
import { getWorkspaces } from "@/features/workspaces/actions";

const SignInPage = async () => {

    // ROUTE PROTECTION //
   
    const user = await getCurrent()

    const workspaces = await getWorkspaces();

    if (user) {
        if (workspaces.total === 0) {
            redirect("/workspaces/create");
        }

        if (workspaces.documents.length > 0) {
            redirect(`/workspaces/${workspaces.documents[0].$id}`);
        }
    }

    // Why is it possible to display home page ?

    return <SignInCard />
    
};

export default SignInPage;