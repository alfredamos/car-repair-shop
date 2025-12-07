import {CustomError} from "@/utils/customError.util";
import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {Ticket} from "@prisma/client";
import {createTicket, getAllTickets} from "@/app/actions/ticket.action";

export async function GET(){
    //----> Fetch all tickets from db.
    const response = await getAllTickets();

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});

}

export async function POST(req: NextRequest, ){
    //-----> Get the ticket payload.
    const ticketPayload = await req.json() as Ticket;

    //----> Create new ticket.
    const response = await createTicket(ticketPayload);

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});

}