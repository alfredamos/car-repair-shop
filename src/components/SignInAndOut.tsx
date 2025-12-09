"use client"

import {useAuthContext} from "@/hooks/useAuthContext";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {UserSession} from "@/app/types/type";
import {NavigationMenuItem, NavigationMenuLink, NavigationMenuList} from "@/components/ui/navigation-menu";
import {Button} from "@/components/ui/button";
import {LocalStorageParam} from "@/utils/LocalStorageParam";
import {logoutUser} from "@/app/actions/auth.action";
import {settingItems} from "@/utils/settingItems";
import {MenuDropdown} from "@/components/MenuDropdown";
import {adminItems} from "@/utils/adminItems";
import {ModeToggle} from "@/components/theme-toggler";
import Link from "next/link";

export default function SignInAndOut() {
    const {authSession} = useAuthContext();
    const {getLocalStorage, removeLocalStorage} = useLocalStorage<UserSession>()

    const isAdmin = authSession?.isAdmin ?? getLocalStorage(LocalStorageParam.authSession)?.isAdmin;
    const isLoggedIn = authSession?.isLoggedIn ?? getLocalStorage(LocalStorageParam.authSession)?.isLoggedIn;

    const logoutUserAction = async () => {
        removeLocalStorage(LocalStorageParam.authSession);
        await logoutUser()
    }

    return (
        <>
            {
               isLoggedIn ? (<NavigationMenuList className="space-x-2">
                  {isAdmin ? (<NavigationMenuItem>
                      <Button variant="ghost" className="hover:bg-black hover:text-white">
                          <MenuDropdown items={adminItems} title="Admin" subTitle="Admin Panel" />
                      </Button>
                  </NavigationMenuItem>) : (null)}

                   <NavigationMenuItem>
                       <Button variant="ghost" className="hover:bg-black hover:text-white focus:outline-none">
                           <MenuDropdown items={settingItems} title="Settings" subTitle="My Account" />
                       </Button>
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
                           <Link href="/signup">Sign Up</Link>
                       </Button>
                   </NavigationMenuItem>
                   <ModeToggle/>
               </NavigationMenuList>)
            }

        </>
    )
}