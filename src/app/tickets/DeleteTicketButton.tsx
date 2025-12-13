"use client"

import {DeleteActionButton} from "@/utils/DeleteActionButton";
import {useRouter} from "next/navigation";
import axios from "axios";

type Props = {
    path: string;
    title: string;
    identifier: string;
    tech: string;
}

export function DeleteTicketButton({ identifier, tech, title, path }: Props) {
    const router = useRouter();

    const onCancel = () => {
        router.push(`${identifier === "Admin" ? "/tickets" : `/tickets/get-tickets-by-email/${tech}`}`);
    }

    const onSubmit = async () => {
        await axios.delete(path);
        router.push(`${identifier === "Admin" ? "/tickets" : `/tickets/get-tickets-by-email/${tech}`}`);
    }

    return (
        <DeleteActionButton onCancel={onCancel} onSubmit={onSubmit} message={`Do you really want to delete this ticket ${title}?`}/>
    );
}