"use client"

import {useAuthContext} from "@/hooks/useAuthContext";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {UserSession} from "@/app/types/type";
import {NavigationMenuItem, NavigationMenuLink, NavigationMenuList} from "@/components/ui/navigation-menu";
import {Button} from "@/components/ui/button";
import {LocalStorageParam} from "@/utils/LocalStorageParam";
import {logoutUser} from "@/app/actions/auth.action";
import {getAllSettingItems, NavLinkType, settingItems} from "@/utils/settingItems";
import {MenuDropdown} from "@/components/MenuDropdown";
import {adminItems} from "@/utils/adminItems";
import {ModeToggle} from "@/components/theme-toggler";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function SignInAndOut() {
    const {authSession} = useAuthContext();
    const {getLocalStorage, removeLocalStorage} = useLocalStorage<UserSession>()

    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(authSession?.isLoggedIn ?? getLocalStorage(LocalStorageParam.authSession)?.isLoggedIn);
    const [isAdmin, setIsAdmin] = useState(authSession?.isAdmin ?? getLocalStorage(LocalStorageParam.authSession)?.isAdmin);

    useEffect(() => {
        const refreshAuth = async () => {
            setIsLoggedIn(authSession?.isLoggedIn ?? getLocalStorage(LocalStorageParam.authSession)?.isLoggedIn);
            setIsAdmin(authSession?.isAdmin ?? getLocalStorage(LocalStorageParam.authSession)?.isAdmin);
        }

        refreshAuth().then().catch(error => console.error(error));
    }, [authSession, getLocalStorage]);


    const logoutUserAction = async () => {
        removeLocalStorage(LocalStorageParam.authSession);
        await logoutUser()
    }

    return (
        <>
            {
               isLoggedIn ? (<NavigationMenuList className="space-x-2">
                  {isAdmin ? (<NavigationMenuItem className="hover:bg-black hover:text-white focus:outline-none gap-2 px-4 pt-1 pb-2 rounded-md">
                        <MenuDropdown items={adminItems} title="Admin" subTitle="Admin Panel" />
                  </NavigationMenuItem>) : ""}

                   <NavigationMenuItem className="hover:bg-black hover:text-white focus:outline-none gap-2 px-4 pt-1 pb-2 rounded-md">
                       <MenuDropdown items={getAllSettingItems(authSession?.email as string)} title="Settings" subTitle="My Account" />

                   </NavigationMenuItem>
                   <NavigationMenuItem>
                       <form action={logoutUserAction}>
                            <Button variant="ghost" className="hover:bg-black hover:text-white" type="submit">
                                Logout
                            </Button>
                       </form>
                   </NavigationMenuItem>
                   <ModeToggle/>
               </NavigationMenuList>
               ) :
               (<NavigationMenuList className="space-x-2">
                   <NavigationMenuItem>
                       <Button variant="ghost" asChild className="hover:bg-black hover:text-white">
                           <Link href="/login">Login</Link>
                       </Button>
                   </NavigationMenuItem>
                   <NavigationMenuItem>
                       <Button asChild variant="ghost" className="hover:bg-black hover:text-white">
                           <Link href="/signup">Register</Link>
                       </Button>
                   </NavigationMenuItem>
                   <ModeToggle/>
               </NavigationMenuList>)
            }

        </>
    )
}