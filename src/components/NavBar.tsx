// components/navbar.tsx
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export function NavBar() {
    return (
        <NavigationMenu className="w-full max-w-none justify-between p-2 bg-white text-black dark:text-white dark:bg-gray-100">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                        Home
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuList className="space-x-2">
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
            </NavigationMenuList>
        </NavigationMenu>
    );
}