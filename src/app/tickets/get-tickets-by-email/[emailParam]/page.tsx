import {getAllTicketsByEmail} from "@/app/actions/ticket.action";
import {CustomError} from "@/utils/customError.util";
import TicketsByEmailTable from "@/app/tickets/get-tickets-by-email/[emailParam]/TicketsByEmailTable";

export default async function AllTicketsByIdPage({params}:{params:Promise<{emailParam:string}>}){
    //----> Get the email from params.
    const {emailParam} = await params;

    //----> Decode email from email-param.
    const email = decodeURIComponent(emailParam);

    //----> Fetch all tickets.
    const response = await getAllTicketsByEmail(email);

    //----> Check for error.
    if (response instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{response?.message}</h1></div>
    }

    return (
        <TicketsByEmailTable tickets={response} />
    );
}