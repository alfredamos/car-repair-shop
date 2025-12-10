import {Ticket} from "@prisma/client";
import {Ticket as TicketValidate} from "@/validations/ticket.validation"

export function initialTicket(ticket?: Ticket | undefined): TicketValidate {
    return {
        completed: ticket?.completed ?? false,
        customerId: ticket?.customerId ?? "",
        notes: ticket?.notes ?? "",
        tech: ticket?.tech ?? "",
        title: ticket?.title ?? "",
    }
}