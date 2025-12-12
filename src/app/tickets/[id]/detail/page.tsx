import {getTicketById} from "@/app/actions/ticket.action";
import {CustomError} from "@/utils/customError.util";
import {getCustomerById} from "@/app/actions/customer.action";
import {getUserByEmail} from "@/app/actions/auth-helpers";
import {TicketCard} from "@/utils/TicketCard";

export default async function TicketDetailPage({params}: {params: Promise<{id: string}>}){
    //----> Get the id params.
    const {id} = await params;

    //----> Get the ticket with the given id.
    const response = await getTicketById(id);

    //----> Check for error.
    if (response instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{response?.message}</h1></div>
    }

    //----> Get the customer and user associated with this ticket.
    const [customerResponse, userResponse] = await Promise.all([getCustomerById(response.customerId), getUserByEmail(response.tech)])

    //----> Check for error.
    if (customerResponse instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{customerResponse?.message}</h1></div>
    }

    //----> Check for error.
    if (userResponse instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{userResponse?.message}</h1></div>
    }

    return (
        <TicketCard ticket={response} customer={customerResponse} user={userResponse}/>
    );
}