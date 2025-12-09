import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {JSX} from "react";


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
                        <DropdownMenuItem key={item.label}>
                            <Link href={item.href} className="py-2 px-4 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition duration-300 w-full">{item.label}</Link>
                        </DropdownMenuItem>
                    ))

                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
}