"use client"

import {Ticket as TicketValidate} from "@/validations/ticket.validation";
import {createCustomer} from "@/app/actions/customer.action";
import {CustomError} from "@/utils/customError.util";
import {redirect} from "next/navigation";
import {TicketForm} from "@/app/tickets/TicketForm";
import {initialTicket} from "@/app/tickets/initialTicket";
import {Customer} from "@prisma/client";
import {UserResponse} from "@/app/types/type";

type Props = {
    customers: Customer[];
    users: UserResponse[];
}

export function AddTicketForm({ customers, users }: Props) {
    async function onSubmit(values: TicketValidate) {
        console.log("Form submitted with values:", values);
        const response = await createCustomer(values as unknown as Customer);

        if (response instanceof CustomError) throw response;

        console.log("Add-ticket-form, response : ", response);
        redirect("/")
    }


    return (
        <TicketForm
            customers={customers}
            defaultValues={initialTicket()}
            formLabel="Add Ticket"
            onSubmitAction={onSubmit}
            users={users}
        />
    );
}