"use client"

import {AlertDeleteDialog} from "@/utils/AlertDeleteDialog";

type Props = {
    message: string;
    onCancel: () => void;
    onSubmit: () => void;
}

export function DeleteActionButton({message, onCancel, onSubmit}: Props) {
    return (
        <AlertDeleteDialog
            dialogName="Delete"
            dialogTitle="Are you sure?"
            dialogMessage={message}
            onSubmit={onSubmit}
            onCancel={onCancel}
        />
    );
}