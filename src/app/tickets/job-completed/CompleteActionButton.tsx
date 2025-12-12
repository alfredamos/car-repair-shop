"use client"

import {Button} from "@/components/ui/button";
import {Ticket} from "@prisma/client";
import {useRouter} from "next/navigation";
import axios from "axios";

type Props = {
    ticket: Ticket;
}

export function CompleteActionButton({ ticket }: Props) {
    const router = useRouter();

    const completeAndUnCompleteAction = async () => {
        await axios.patch(`/api/tickets/job-completed/${ticket.id}`, {})
        router.push("/tickets");

    }

    return (
        <Button variant="success" type="button" size="sm" className="m-2" onClick={completeAndUnCompleteAction}>
                {ticket.completed ? "Done" : "Undo"}
        </Button>
    );
}