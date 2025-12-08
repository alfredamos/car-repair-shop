"use client"

import {useAuthContext} from "@/hooks/useAuthContext";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {UserSession} from "@/app/types/type";
import {NavigationMenuItem, NavigationMenuLink, NavigationMenuList} from "@/components/ui/navigation-menu";
import {Button} from "@/components/ui/button";
import {LocalStorageParam} from "@/utils/LocalStorageParam";

export default function SignInAndOut() {
    const {authSession, setAuthSession} = useAuthContext();
    const {getLocalStorage, setLocalStorage} = useLocalStorage<UserSession>()

    const isLoggedIn = authSession?.isLoggedIn ?? getLocalStorage(LocalStorageParam.authSession)?.isLoggedIn;

    return (
        <>
            {
               isLoggedIn ? (<NavigationMenuList className="space-x-2">
                   <NavigationMenuItem>
                       <Button variant="ghost" asChild className="hover:bg-black hover:text-white">
                           <NavigationMenuLink href="/login">Profile</NavigationMenuLink>
                       </Button>
                   </NavigationMenuItem>
                   <NavigationMenuItem>
                       <Button asChild variant="ghost" className="hover:bg-black hover:text-white">
                           <NavigationMenuLink href="/logout">Logout</NavigationMenuLink>
                       </Button>
                   </NavigationMenuItem>
               </NavigationMenuList>
               ) :
               (<NavigationMenuList className="space-x-2">
                   <NavigationMenuItem>
                       <Button variant="ghost" asChild className="hover:bg-black hover:text-white">
                           <NavigationMenuLink href="/login">Login</NavigationMenuLink>
                       </Button>
                   </NavigationMenuItem>
                   <NavigationMenuItem>
                       <Button asChild variant="ghost" className="hover:bg-black hover:text-white">
                           <NavigationMenuLink href="/signup">Sign Up</NavigationMenuLink>
                       </Button>
                   </NavigationMenuItem>
               </NavigationMenuList>)
            }

        </>
    )
}