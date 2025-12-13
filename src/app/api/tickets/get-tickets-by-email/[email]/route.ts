import {getAllTickets, getAllTicketsById} from "@/app/actions/ticket.action";
import {CustomError} from "@/utils/customError.util";
import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";

export async function GET(_req: NextRequest, {params}:{params: Promise<{email: string}>}){
    //----> Get the email from params.
    const {email} = await params;

    //----> Fetch all tickets from db.
    const response = await getAllTicketsById(email);

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});

}
