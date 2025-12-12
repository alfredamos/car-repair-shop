import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {JSX} from "react";
import {NavLink} from "@/components/NavLink";


interface Props {
    title: string;
    subTitle: string;
    items: Array<{ href: string; label: string }>;
}

export function MenuDropdown({title, subTitle, items}: Props): JSX.Element {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">{title}</DropdownMenuTrigger>
            <DropdownMenuContent>
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