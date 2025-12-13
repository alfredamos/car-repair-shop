import {getSession} from "@/app/actions/auth.action";
import {TicketQueryCondition} from "@/utils/TicketQueryCondition";
import {getTicketsByTicketQuery} from "@/app/actions/ticket.action";
import {CustomError} from "@/utils/customError.util";
import TicketTable from "@/app/tickets/TicketTable";

export default async function InCompletedTicketsPage(){
    //----> Get user session.
    const {isAdmin} = await getSession();

    //----> Check for admin permission.
    if (!isAdmin) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You do not have permission to view this page</h1></div>
    }

    //----> Retrieve all tickets matching the given query.
    const query : TicketQueryCondition = {
        completed: false
    }

    const response = await getTicketsByTicketQuery(query)

    //----> Check for error.
    if (response instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{response?.message}</h1></div>
    }

    return (
        <TicketTable tickets={response} />
    );
}