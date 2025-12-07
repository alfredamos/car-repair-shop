import {NextRequest, NextResponse} from "next/server";
import {getTicketById, ticketJobCompleted} from "@/app/actions/ticket.action";
import {CustomError} from "@/utils/customError.util";
import {StatusCodes} from "http-status-codes";

export async function PATCH(_req: NextRequest, {params}: {params: Promise<{id: string}>}){
    //-----> Get the id from params.
    const {id} = await params;

    //----> Fetch the ticket with the given id.
    const response = await ticketJobCompleted(id);

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});

}
