"use client"

import {DeleteActionButton} from "@/utils/DeleteActionButton";
import {useRouter} from "next/navigation";
import axios from "axios";

type Props = {
    path: string;
    name: string;
}

export function DeleteUserButton({ name, path }: Props) {
    const router = useRouter();

    const onCancel = () => {
        router.push("/users");
    }

    const onSubmit = async () => {
        await axios.delete(path);
        router.push("/users");
    }

    return (
        <DeleteActionButton onCancel={onCancel} onSubmit={onSubmit} message={`Do you really want to delete this user : ${name}?`}/>
    );
}