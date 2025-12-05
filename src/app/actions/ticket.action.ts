import {Ticket} from "@prisma/client"
import {prisma} from "@/app/db/prisma.db";
import {makeCustomError} from "@/utils/makeCustomError";
import {adminOrManagerOrOwnerCheckAndUserSession} from "@/utils/adminOrManagerOrOwnerCheckAndUserSession";
import {StatusCodes} from "http-status-codes";
import {ResponseMessage} from "@/utils/responseMessage.util";
import catchError from "http-errors";
import {getOneTicket} from "@/app/actions/ticket-helper";

export async function createTicket(ticket: Ticket) {
    try{
        const {isAdminOrManager} = await adminOrManagerOrOwnerCheckAndUserSession()

        //----> You must be an admin or manager to create a ticket.
        if (!isAdminOrManager) {
            throw catchError(StatusCodes.FORBIDDEN, "You don't have the permission to create a ticket!");
        }

        //----> Store the new-ticket in the db.
        const newTicket = await prisma.ticket.create({
            data: {...ticket}
        });

        //----> Send back response.
        return newTicket;
    }catch(error){
        return makeCustomError(error);
    }

}

export async function deleteTicketId(id: string) {
    try {
        const {isAdminOrManager} = await adminOrManagerOrOwnerCheckAndUserSession()

        //----> You must be an admin or manager to delete a ticket.
        if (!isAdminOrManager){
            throw catchError(StatusCodes.FORBIDDEN, "You don't have the permission to delete this resource!");
        }

        //----> Check for existence of ticket.
        await getOneTicket(id);

        //----> Delete the ticket with the given id.
        await prisma.ticket.delete({
            where: {id}
        });

        //----> Send back response.
        return new ResponseMessage("Ticket deleted successfully.", "success", StatusCodes.OK);
    }catch(error){
        return makeCustomError(error);
    }
}


export async function editTicketById(id: string, ticket: Ticket) {
    try {
        const {isAdminOrManager} = await adminOrManagerOrOwnerCheckAndUserSession()

        //----> You must be an admin or manager to edit this resource.
        if (!isAdminOrManager){
            throw catchError(StatusCodes.FORBIDDEN, "You don't have the permission to edit this resource!");
        }

        //----> Check for existence of ticket.
        await getOneTicket(id);

        //----> Edit the ticket with the given id.
        await prisma.ticket.update({
            where: {id},
            data: {...ticket}
        });

        //----> Send back response.
        return new ResponseMessage("Ticket deleted successfully.", "success", StatusCodes.OK);
    }catch(error){
        return makeCustomError(error);
    }
}

export async function getTicketById(id: string) {
    try {
        const {isAdminOrManager} = await adminOrManagerOrOwnerCheckAndUserSession()

        //----> You must be an admin or manager to view this page.
        if (!isAdminOrManager){
            throw catchError(StatusCodes.FORBIDDEN, "You don't have the permission to view this page!");
        }

        //----> Check for existence of ticket.
        return await getOneTicket(id);

    }catch(error){
        return makeCustomError(error);
    }
}

export async function getAllTickets() {
    try {
        const {isAdminOrManager} = await adminOrManagerOrOwnerCheckAndUserSession();

        //----> You must be an admin or manager to view this page.
        if (!isAdminOrManager){
            throw catchError(StatusCodes.FORBIDDEN, "You don't have the permission to view this page!");
        }

        //----> Fetch all tickets.
        return await prisma.ticket.findMany({})
    }catch (error) {
        return makeCustomError(error);
    }
}
