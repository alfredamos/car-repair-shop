"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {NavLink} from "@/components/NavLink";
import {useState} from "react";


interface Props {
    title: string;
    subTitle: string;
    items: Array<{ href: string; label: string }>;
}

export function MenuDropdown({ title, subTitle, items}: Props) {
    const [openDropdown, setOpenDropdown] = useState(false);
    return (
        <DropdownMenu  open={openDropdown}
                       onOpenChange={() => setOpenDropdown(false)}
                       modal={false}
        >
            <DropdownMenuTrigger   onMouseEnter={() => setOpenDropdown(true)} className="focus:outline-none">{title}</DropdownMenuTrigger>
            <DropdownMenuContent onMouseLeave={() => setOpenDropdown(false)} >
                <DropdownMenuLabel>{subTitle}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {
                    items.map(item => (
                        <NavLink key={item.label} href={item.href} label={item.label}/>
                    ))

                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
}