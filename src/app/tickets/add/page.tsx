import {getAllCustomers} from "@/app/actions/customer.action";
import {getAllUsers} from "@/app/actions/user.action";
import {CustomError} from "@/utils/customError.util";
import {TicketForm} from "@/app/tickets/TicketForm";
import {initialTicket} from "@/app/tickets/initialTicket";

export default async function AddTicketPage(){
    //----> Get all customers and users.
    const [customersResponse, usersResponse] = await Promise.all([getAllCustomers(), getAllUsers()]);

    //----> Check for error in retrieving customers.
    if (customersResponse instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{customersResponse?.message}</h1></div>
    }

    //----> Check for error in retrieving users.
    if (usersResponse instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{usersResponse?.message}</h1></div>
    }

    return (
        <TicketForm
            customers={customersResponse}
            defaultValues={initialTicket()}
            formLabel="Create"
            users={usersResponse}
        />
    );
}