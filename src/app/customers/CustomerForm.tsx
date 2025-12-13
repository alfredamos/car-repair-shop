"use client"

import {Customer as CustomerValidate, customerSchema} from "@/validations/customer.validation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {InputWithLabel} from "@/components/form-elements/InputWithLabel";
import {SelectWithLabel} from "@/components/form-elements/SelectWithLabel";
import {Button} from "@/components/ui/button";
import {TextAreaWithLabel} from "@/components/form-elements/TextAreaWithLabel";
import {createCustomer, editCustomerById} from "@/app/actions/customer.action";
import {Customer} from "@prisma/client";
import {CustomError} from "@/utils/customError.util";
import {redirect, useRouter} from "next/navigation";
import {Separator} from "@/components/ui/separator";

type Props = {
    formLabel: string;
    defaultValues: CustomerValidate;
    id?: string;
}

export function CustomerForm({defaultValues, formLabel, id}: Props) {
    const router = useRouter();

    async function onSubmit(values: CustomerValidate) {

        if (formLabel === "Create") {
            console.log("Form submitted with values:", values);
            const customerResponse = await createCustomer(values as unknown as Customer);

           if (customerResponse instanceof CustomError) throw customerResponse;

           console.log("In create customer form, customer : ", customerResponse);
        }else if (formLabel === "Edit") {
            values.id = id;
            console.log("Form submitted with values:", values);
            const customerResponse = await editCustomerById(id!, values as unknown as Customer);

           if (customerResponse instanceof CustomError) throw customerResponse;
           console.log("In edit customer form, customer : ", customerResponse);
        }


        redirect("/")
    }

    const form = useForm<CustomerValidate>({
        resolver: zodResolver(customerSchema),
        mode:"onBlur",
        defaultValues,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-50 dark:text-black dark:bg-black text-slate-800 max-w-sm items-center mx-auto rounded-xl shadow-2xl py-6 px-10 mt-10">
                <h4 className="font-bold text-slate-800 text-center text-xl mb-2 dark:text-white">
                    {`${formLabel} Customer Form`}
                </h4>
                <Separator className="mt-4 mb-4"/>
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex flex-col md:flex-1">
                        <InputWithLabel<CustomerValidate> fieldTitle="Email" type="text" nameInSchema="email" className="mb-2 dark:text-white"/>
                        <InputWithLabel<CustomerValidate> fieldTitle="Name" type="text" nameInSchema="name" className="mb-2 dark:text-white" />
                        <InputWithLabel<CustomerValidate> fieldTitle="BirthDate" type="date" nameInSchema="dateOfBirth" className="mb-2 dark:text-white" />
                    </div>

                    <div className="flex flex-col md:flex-1">
                        <InputWithLabel<CustomerValidate> fieldTitle="Phone" type="tel" nameInSchema="phone" className="mb-2 dark:text-white" />
                        <InputWithLabel<CustomerValidate> fieldTitle="Address" type="text" nameInSchema="address" className="mb-2 dark:text-white" />
                        <InputWithLabel<CustomerValidate> fieldTitle="Image" type="text" nameInSchema="image" className="mb-2 dark:text-white" />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:colospan-2">
                    <SelectWithLabel<CustomerValidate> fieldTitle="Gender" nameInSchema="gender" data={[{id: "Male", value: "Male"}, {id: "Female", value: "Female"}]} className="w-full dark:text-white"/>
                    <TextAreaWithLabel<CustomerValidate> fieldTitle="Notes" nameInSchema="notes" className="mb-3 dark:text-white -mt-1.5" />
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