'use client'

import { usePathname } from "next/navigation";
import LoginPage from "./login/page";
import SignUpPage from "./signUp/page";
import UusiSalasanaPage from "./uusiSalasana/page";
import EmailLinkPage from "./emailLink/page";
import AdminPage from "./admin/page";

export const LayoutProvider = ({children}: { children: React.ReactNode }) => {
    const pathname = usePathname();

    return(
        <>
        {(pathname === "/login")
        ? <div className="flex h-screen">
            <LoginPage/>
        </div>
        : (pathname === '/emailLink')
            ? <div className="flex h-screen">
                <EmailLinkPage/>
            </div>
            : (pathname === '/uusiSalasana')
                ? <div className="flex h-screen">
                    <UusiSalasanaPage/>
                </div>
                : (pathname === '/signUp')
                    ? <div className="flex h-screen">
                        <SignUpPage/>
                    </div>
                    : (pathname?.includes('/admin'))
                    ? <div className="flex h-screen">
                        <AdminPage/>
                    </div>
                    :<div>
                        {children}
                    </div>
        }
    
        </>
    )
}