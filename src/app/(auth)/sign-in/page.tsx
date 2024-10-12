
import { redirect } from "next/navigation"

import { getCurrent } from "@/features/auth/actions"
import { SignInCard } from "@/features/auth/components/sign-in-card"

const SignInPage = async () => {

    // ROUTE PROTECTION //
    const user = await getCurrent()
    if (user) redirect("/")

    return <SignInCard />
}

export default SignInPage 