import {CustomError} from "@/utils/customError.util";
import {getAllCustomers} from "@/app/actions/customer.action";
import {getAllUsers} from "@/app/actions/user.action";
import {AddTicketForm} from "@/app/tickets/add/AddTicketForm";
import {EditTicketForm} from "@/app/tickets/[id]/edit/EditTicketForm";
import {getTicketById} from "@/app/actions/ticket.action";

export default async function TicketEditPage({params}:{params:Promise<{id: string}>}){
    //----> Get the id from params.
    const {id} = await params;

    //----> Get all customers and users.
    const [customerResponse, userResponse, ticketResponse] = await Promise.all([getAllCustomers(), getAllUsers(), getTicketById(id)]);

    //----> Check for error in retrieving customers.
    if (customerResponse instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{customerResponse?.message}</h1></div>
    }

    //----> Check for error in retrieving users.
    if (userResponse instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{userResponse?.message}</h1></div>
    }

    //----> Check for error in retrieving users.
    if (ticketResponse instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{ticketResponse?.message}</h1></div>
    }

    return (
        <EditTicketForm
            customers={customerResponse}
            ticket={ticketResponse}
            users={userResponse}
        />
    );
}