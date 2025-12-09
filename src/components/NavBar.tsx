// components/navbar.tsx
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import SignInAndOut from "@/components/SignInAndOut";
import {Button} from "@/components/ui/button";
import {MenuDropdown} from "@/components/MenuDropdown";
import {adminItems} from "@/utils/adminItems";
import Link from "next/link";

export function NavBar() {

    return (
        <NavigationMenu className="w-full max-w-none justify-between p-2 bg-white text-black dark:text-white dark:bg-gray-500 shadow-md sticky top-0 bg-background z-10">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Button variant="ghost" className="hover:bg-black hover:text-white">
                        <Link href="/">Home</Link>
                    </Button>
                </NavigationMenuItem>
            </NavigationMenuList>
            <SignInAndOut/>
        </NavigationMenu>
    );
}