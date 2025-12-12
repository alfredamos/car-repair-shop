import {Ticket} from "@prisma/client";
import {getTicketById} from "@/app/actions/ticket.action";
import {CustomError} from "@/utils/customError.util";

export default async function TicketDetailPage({params}: {params: Promise<{id: string}>}){
    //----> Get the id params.
    const {id} = await params;

    //----> Get the ticket with the given id.
    const response = await getTicketById(id);

    //----> Check for error.
    if (response instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{response?.message}</h1></div>
    }

    return (
        <div>{JSON.stringify(response)}</div>
    );
}