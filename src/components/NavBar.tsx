// components/navbar.tsx
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import SignInAndOut from "@/components/SignInAndOut";

export function NavBar() {

    return (
        <NavigationMenu className="w-full max-w-none justify-between p-2 bg-white text-black dark:text-white dark:bg-gray-100 shadow-md sticky top-0 bg-background z-10">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                        Home
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
            <SignInAndOut/>
        </NavigationMenu>
    );
}