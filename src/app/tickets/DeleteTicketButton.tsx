"use client"

import {DeleteActionButton} from "@/utils/DeleteActionButton";
import {useRouter} from "next/navigation";
import axios from "axios";

type Props = {
    path: string;
    title: string;
}

export function DeleteTicketButton({ title, path }: Props) {
    const router = useRouter();

    const onCancel = () => {
        router.push("/tickets");
    }

    const onSubmit = async () => {
        await axios.delete(path);
        router.push("/tickets");
    }

    return (
        <DeleteActionButton onCancel={onCancel} onSubmit={onSubmit} message={`Do you really want to delete this ticket ${title}?`}/>
    );
}