import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {JSX, MouseEventHandler} from "react";
import {NavLink} from "@/components/NavLink";


interface Props {
    onMouseLeave?: () => MouseEventHandler<HTMLButtonElement>;
    title: string;
    subTitle: string;
    items: Array<{ href: string; label: string }>;
}

export function MenuDropdown({onMouseLeave, title, subTitle, items}: Props): JSX.Element {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger onMouseLeave={onMouseLeave} className="focus:outline-none">{title}</DropdownMenuTrigger>
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