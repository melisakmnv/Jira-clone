"use client";

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {

    const SIGN_UP = {
        route: "/sign-up",
        label : "Sign Up"
    }
    const SIGN_IN = {
        route : "/sign-in",
        label : "Login"
    }

    const pathname = usePathname()
    const isSignIn = pathname === SIGN_IN.route


    return (
        <main className='bg-neutral-100 min-h-screen'>
            <div className='mx-auto max-w-screen-2xl p-4'>
                <nav className='flex justify-between items-center'>
                    <Logo/>
                    <Button asChild variant={"secondary"}>
                        <Link href={isSignIn ? SIGN_UP.route : SIGN_IN.route}>
                            {isSignIn ? SIGN_UP.label : SIGN_IN.label}
                        </Link>
                    </Button>
                </nav>
                <div className='flex flex-col items-center justify-center pt-4 md:pt-14'>
                    {children}
                </div>

            </div>
        </main>
    );
};

export default AuthLayout;