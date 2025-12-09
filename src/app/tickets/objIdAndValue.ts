import {Customer, Role} from "@prisma/client";
import {UserResponse} from "@/app/types/type";

export function customerIdAndName(customers: Customer[]) {
    return customers.map(customer => ({id: customer.id, value: customer.name}))
}

export function userTechEmail(users: UserResponse[]) {
    return users.filter(user => user.role === Role.User).map(user => ({id:user.email, value: user.email}))
}