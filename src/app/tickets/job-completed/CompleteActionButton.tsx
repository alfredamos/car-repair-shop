"use client"

import {Button} from "@/components/ui/button";
import {Ticket} from "@prisma/client";
import {useRouter} from "next/navigation";
import axios from "axios";

type Props = {
    ticket: Ticket;
    identifier: string;
}

export function CompleteActionButton({ identifier, ticket }: Props) {
    const router = useRouter();

    const completeAndUnCompleteAction = async () => {
        await axios.patch(`/api/tickets/job-completed/${ticket.id}`, {})
        router.push(`${identifier === "Admin" ? "/tickets" : `/tickets/get-tickets-by-email/${ticket.tech}`}`);

    }

    return (
        <Button variant="success" type="button" size="sm" className="m-2" onClick={completeAndUnCompleteAction}>
                {ticket.completed ? "Undo" : "Done"}
        </Button>
    );
}