import {Customer, Gender} from "@prisma/client";
import {Customer as CustomerValidate} from "@/validations/customer.validation";

export  function initialCustomer(customer?: Customer | undefined): CustomerValidate {
    return {
        address: customer?.address ??"",
        name: customer?.name ?? "",
        email: customer?.email ?? "",
        phone: customer?.phone ?? "",
        image: customer?.image ?? "",
        gender: customer?.gender ?? Gender.Male,
        dateOfBirth: customer?.dateOfBirth as unknown as Date ??  new Date(),
        notes: ""
    }
}