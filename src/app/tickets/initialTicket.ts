import {Ticket} from "@prisma/client";
import {Ticket as TicketValidate} from "@/validations/ticket.validation"

export function initialTicket(ticket?: Ticket | undefined): TicketValidate {
    return {
        completed: ticket?.completed ?? true,
        customerId: ticket?.title ?? "",
        notes: ticket?.notes ?? "",
        tech: ticket?.tech ?? "",
        title: ticket?.title ?? "",
    }
}