"use client"

import {useForm} from "react-hook-form";
import {Ticket as TicketValidate, ticketSchema} from "@/validations/ticket.validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {InputWithLabel} from "@/components/form-elements/InputWithLabel";
import {SelectWithLabel} from "@/components/form-elements/SelectWithLabel";
import {TextAreaWithLabel} from "@/components/form-elements/TextAreaWithLabel";
import {Button} from "@/components/ui/button";
import {Customer} from "@prisma/client";
import {CheckboxWithLabel} from "@/components/form-elements/CheckboxWithLabel";
import {customerIdAndName, userTechEmail} from "@/app/tickets/objIdAndValue";
import {UserResponse} from "@/app/types/type";

type Props = {
    customers: Customer[];
    defaultValues: TicketValidate;
    formLabel: string;
    users: UserResponse[];
    onSubmitAction: (data: TicketValidate) => void;
}

export function TicketForm({customers, defaultValues, formLabel, users, onSubmitAction}: Props) {

    const form = useForm<TicketValidate>({
        resolver: zodResolver(ticketSchema),
        mode:"onBlur",
        defaultValues,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitAction)} className="bg-gray-100 dark:text-black dark:bg-black text-slate-800 max-w-sm items-center mx-auto rounded-xl shadow-2xl p-10 mt-10">
                <h4 className="font-bold text-slate-800 text-center text-2xl mb-2 dark:text-white">
                    {formLabel}
                </h4>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                        <InputWithLabel<TicketValidate> fieldTitle="Title" type="text" nameInSchema="title" className="mb-2 dark:text-white" />
                        <SelectWithLabel<TicketValidate> fieldTitle="Tech" nameInSchema="tech" data={[...userTechEmail(users)]} className="w-full dark:text-white"/>
                        <SelectWithLabel<TicketValidate> fieldTitle="Customer ID" nameInSchema="customerId" data={[...customerIdAndName(customers)]} className="w-full dark:text-white"/>
                        <TextAreaWithLabel<TicketValidate> fieldTitle="Notes" nameInSchema="notes"/>
                        <CheckboxWithLabel<TicketValidate> fieldTitle="Completed" nameInSchema="completed" message="Completed" />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 mt-6">
                    <Button type="submit" size="lg" className="flex-1 mb-2" variant="indigo">Save</Button>
                    <Button type="button" size="lg" className="flex-1 mb-4" variant="rose" onClick={() => form.reset(defaultValues)}>Reset</Button>
                </div>

            </form>
        </Form>
    )

}
