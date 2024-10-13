import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
import { UserButton } from "@/features/auth/components/user-button";


// async can not be use in "use client", this component is now server component //
export default async function Home() {

    // ROUTE PROTECTION //
    const user = await getCurrent()
    if (!user) redirect("/sign-in");

    return (
        <div>
           THis is a home page
        </div>
    );
};
