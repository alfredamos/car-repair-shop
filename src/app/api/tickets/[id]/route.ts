import {NextRequest, NextResponse} from "next/server";
import {CustomError} from "@/utils/customError.util";
import {StatusCodes} from "http-status-codes";
import {deleteTicketById, editTicketById, getTicketById} from "@/app/actions/ticket.action";
import {Ticket} from "@prisma/client";

export async function DELETE(_req: NextRequest, {params}: {params: Promise<{id: string}>}){
    //-----> Get the id from params.
    const {id} = await params;

    //----> Delete the ticket with the given id.
    const response = await deleteTicketById(id);

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});

}

export async function GET(_req: NextRequest, {params}: {params: Promise<{id: string}>}){
    //-----> Get the id from params.
    const {id} = await params;

    //----> Fetch the ticket with the given id.
    const response = await getTicketById(id);

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});

}

export async function PATCH(req: NextRequest, {params}: {params: Promise<{id: string}>}){
    //-----> Get the id from params and the ticket payload.
    const {id} = await params;
    const ticketPayload = await req.json() as Ticket;

    //----> Edit the ticket with the given id.
    const response = await editTicketById(id, ticketPayload);

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});

}