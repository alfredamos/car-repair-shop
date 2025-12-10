import {Customer, Gender} from "@prisma/client";
import {Customer as CustomerValidate} from "@/validations/customer.validation";
import {formattedDate} from "@/utils/formattedDate";

export  function initialCustomer(customer?: Customer | undefined): CustomerValidate {
    return {
        address: customer?.address ??"",
        active: customer?.active ?? true,
        name: customer?.name ?? "",
        email: customer?.email ?? "",
        phone: customer?.phone ?? "",
        image: customer?.image ?? "",
        gender: customer?.gender ?? Gender.Male,
        dateOfBirth: formattedDate(customer?.dateOfBirth as Date) ??  "",
        notes: customer?.notes ?? "",
    }
}