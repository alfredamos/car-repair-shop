import {getAllTickets} from "@/app/actions/ticket.action";
import {CustomError} from "@/utils/customError.util";
import TicketTable from "@/app/tickets/TicketTable";

export default async function AllTicketsPage(){
    //----> Fetch all tickets.
    const responseTickets = await getAllTickets();

    //----> Check for error.
    if (responseTickets instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{responseTickets?.message}</h1></div>
    }

    return (
        <TicketTable tickets={responseTickets} />
    );
}