"use client"

import {useForm} from "react-hook-form";
import {Ticket as TicketValidate, ticketSchema} from "@/validations/ticket.validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {InputWithLabel} from "@/components/form-elements/InputWithLabel";
import {SelectWithLabel} from "@/components/form-elements/SelectWithLabel";
import {TextAreaWithLabel} from "@/components/form-elements/TextAreaWithLabel";
import {Button} from "@/components/ui/button";
import {Customer, Ticket} from "@prisma/client";
import {customerIdAndName, userTechEmail} from "@/app/tickets/objIdAndValue";
import {UserResponse} from "@/app/types/type";
import {CustomError} from "@/utils/customError.util";
import {redirect, useRouter} from "next/navigation";
import {createTicket, editTicketById} from "@/app/actions/ticket.action";
import {CheckBoxWithLabel} from "@/components/form-elements/CheckBoxWithLabel";
import {Separator} from "@/components/ui/separator";

type Props = {
    customers: Customer[];
    defaultValues: TicketValidate;
    formLabel: string;
    id?: string;
    users: UserResponse[];
}

export function TicketForm({customers, defaultValues, formLabel, users, id}: Props) {
    const router = useRouter();
    const form = useForm<TicketValidate>({
        resolver: zodResolver(ticketSchema),
        mode:"onBlur",
        defaultValues,
    });

    async function onSubmit(values: TicketValidate) {
        if (formLabel === "Create") {
            const response = await createTicket(values as unknown as Ticket);

            if (response instanceof CustomError) throw response;

        }else if (formLabel === "Edit") {
            values.id = id;
            const response = await editTicketById(id!, values as unknown as Ticket);

            if (response instanceof CustomError) throw response;

        }

        redirect("/tickets")
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-50 dark:text-black dark:bg-black text-slate-800 max-w-sm items-center mx-auto rounded-xl shadow-2xl py-6 px-10 mt-10">
                <h4 className="font-bold text-slate-800 text-center text-xl mb-2 dark:text-white">
                    {`${formLabel} Ticket Form`}
                </h4>
                <Separator className="mt-4 mb-4"/>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                        <InputWithLabel<TicketValidate> fieldTitle="Title" type="text" nameInSchema="title" className="mb-2 dark:text-white" />
                        <SelectWithLabel<TicketValidate> fieldTitle="Tech" nameInSchema="tech" data={[...userTechEmail(users)]} className="w-full dark:text-white mb-2"/>
                        <SelectWithLabel<TicketValidate> fieldTitle="Customer ID" nameInSchema="customerId" data={[...customerIdAndName(customers)]} className="w-full dark:text-white mb-2"/>
                        <TextAreaWithLabel<TicketValidate> fieldTitle="Notes" nameInSchema="notes" className="dark:text-white"/>
                        <CheckBoxWithLabel<TicketValidate> fieldTitle="Completed" nameInSchema="completed" message="Yes" />
                    </div>
                </div>
                <Separator className="mt-4"/>
                <div className="flex flex-col md:flex-row items-center md:justify-between mt-6 gap-2">
                    <Button type="button" size="sm" className="w-full md:w-1/4 mb-4" variant="back" onClick={() => router.back()}>Back</Button>
                    <Button type="submit" size="sm" className="w-full md:w-1/4 mb-4" variant="indigo">Save</Button>
                    <Button type="button" size="sm" className="w-full md:w-1/4 mb-4" variant="rose" onClick={() => form.reset(defaultValues)}>Reset</Button>
                </div>

            </form>
        </Form>
    )

}
