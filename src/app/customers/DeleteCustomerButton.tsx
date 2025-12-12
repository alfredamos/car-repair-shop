"use client"

import {DeleteActionButton} from "@/utils/DeleteActionButton";
import {useRouter} from "next/navigation";
import axios from "axios";

type Props = {
    path: string;
    name: string;
}

export function DeleteCustomerButton({ name, path }: Props) {
    const router = useRouter();

    const onCancel = () => {
        router.push("/customers");
    }

    const onSubmit = async () => {
        await axios.delete(path);
        router.push("/customers");
    }

    return (
        <DeleteActionButton onCancel={onCancel} onSubmit={onSubmit} message={`Do you really want to delete this customer : ${name}?`}/>
    );
}