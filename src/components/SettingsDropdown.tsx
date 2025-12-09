"use client"

import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function SettingsDropdown() {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>Settings</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href="/change-password" className="py-2 px-4 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition duration-300">Change Password</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/edit-profile" className="py-2 px-4 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition duration-300">Edit Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/" className="py-2 px-4 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition duration-300">Home</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    );
}