"use client"

import {Customer as CustomerValidate, customerSchema} from "@/validations/customer.validation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {InputWithLabel} from "@/components/form-elements/InputWithLabel";
import {SelectWithLabel} from "@/components/form-elements/SelectWithLabel";
import {Button} from "@/components/ui/button";
import {TextAreaWithLabel} from "@/components/form-elements/TextAreaWithLabel";
import {formattedDate} from "@/utils/formattedDate";

type Props = {
    formLabel: string;
    defaultValues: CustomerValidate;
    onSubmitAction: (data: CustomerValidate) => void;
}

export function CustomerForm({defaultValues, formLabel, onSubmitAction}: Props) {
    const form = useForm<CustomerValidate>({
        resolver: zodResolver(customerSchema),
        mode:"onBlur",
        defaultValues,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitAction)} className="bg-gray-100 dark:text-black dark:bg-black text-slate-800 max-w-sm items-center mx-auto rounded-xl shadow-2xl p-10 mt-10">
                <h4 className="font-bold text-slate-800 text-center text-2xl mb-2 dark:text-white">
                    {formLabel}
                </h4>
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex flex-col">
                        <InputWithLabel<CustomerValidate> fieldTitle="Email" type="text" nameInSchema="email" className="mb-2 dark:text-white"/>
                        <InputWithLabel<CustomerValidate> fieldTitle="Name" type="text" nameInSchema="name" className="mb-2 dark:text-white" />
                        <InputWithLabel<CustomerValidate> fieldTitle="BirthDate" type="date" nameInSchema="dateOfBirth" className="mb-2 dark:text-white" />
                    </div>

                    <div className="flex flex-col">
                        <InputWithLabel<CustomerValidate> fieldTitle="Phone" type="email" nameInSchema="email" className="mb-2 dark:text-white" />
                        <InputWithLabel<CustomerValidate> fieldTitle="Address" type="text" nameInSchema="address" className="mb-2 dark:text-white" />
                        <InputWithLabel<CustomerValidate> fieldTitle="Image" type="text" nameInSchema="image" className="mb-2 dark:text-white" />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:colospan-2">
                    <SelectWithLabel<CustomerValidate> fieldTitle="Gender" nameInSchema="gender" data={[{id: "male", value: "Male"}, {id: "female", value: "Female"}]} className="w-full dark:text-white"/>
                    <TextAreaWithLabel<CustomerValidate> fieldTitle="Notes" nameInSchema="notes" className="mb-3 dark:text-white -mt-1.5" />
                </div>

                <div className="flex flex-col md:flex-row gap-2 mt-6">
                    <Button type="submit" size="lg" className="flex-1 mb-2" variant="indigo">Save</Button>
                    <Button type="button" size="lg" className="flex-1 mb-4" variant="rose" onClick={() => form.reset(defaultValues)}>Reset</Button>
                </div>

            </form>
        </Form>
    )

}