import {CustomError} from "@/utils/customError.util";
import {getAllCustomers} from "@/app/actions/customer.action";
import {getAllUsers} from "@/app/actions/user.action";
import {getTicketById} from "@/app/actions/ticket.action";
import {initialTicket} from "@/app/tickets/initialTicket";
import {TicketForm} from "@/app/tickets/TicketForm";

export default async function TicketEditPage({params}:{params:Promise<{id: string}>}){
    //----> Get the id from params.
    const {id} = await params;

    //----> Get all customers and users.
    const [customersResponse, usersResponse, ticketResponse] = await Promise.all([getAllCustomers(), getAllUsers(), getTicketById(id)]);

    //----> Check for error in retrieving customers.
    if (customersResponse instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{customersResponse?.message}</h1></div>
    }

    //----> Check for error in retrieving users.
    if (usersResponse instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{usersResponse?.message}</h1></div>
    }

    //----> Check for error in retrieving ticket.
    if (ticketResponse instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{ticketResponse?.message}</h1></div>
    }

    return (
        <TicketForm
            customers={customersResponse}
            defaultValues={initialTicket(ticketResponse)}
            formLabel="Edit"
            users={usersResponse}
            id={id}
        />
    );
}