import {prisma} from "@/app/db/prisma.db";
import {CustomError} from "@/utils/customError.util";
import {StatusCodes} from "http-status-codes";

export async function getOneTicket(id: string)  {
    //----> Fetch the ticket object with the given id.
    const ticket = await prisma.ticket.findUnique({where:{id}});

    //----> Check for error.
    if (!ticket) {
        throw new CustomError("Not found", "Token is not found.", StatusCodes.NOT_FOUND);
    }

    return ticket;

}



