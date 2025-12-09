"use client"

import {CustomerForm} from "@/app/customers/CustomerForm";
import {Customer as CustomerValidate} from "@/validations/customer.validation";
import {redirect} from "next/navigation";
import {Customer } from "@prisma/client";
import {createCustomer} from "@/app/actions/customer.action";
import {CustomError} from "@/utils/customError.util";
import {initialCustomer} from "@/app/customers/initialCustomer";

type Props = {
    customer: Customer;
}

export function EditCustomerForm({ customer }: Props) {


    async function onSubmit(values: CustomerValidate) {
        console.log("Form submitted with values:", values);
        const response = await createCustomer(values as unknown as Customer);

        if (response instanceof CustomError) throw response;

        console.log("Add-customer-form, response : ", response);
        redirect("/")
    }


    return (
        <CustomerForm
            defaultValues={initialCustomer(customer)}
            formLabel="Edit Customer"
            onSubmitAction={onSubmit}
        />
    );
}