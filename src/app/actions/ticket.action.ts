"use server"

import {Ticket} from "@prisma/client"
import {prisma} from "@/app/db/prisma.db";
import {makeCustomError} from "@/utils/makeCustomError";
import {StatusCodes} from "http-status-codes";
import catchError from "http-errors";
import {getOneTicket} from "@/app/actions/ticket-helper";
import {adminOrManagerOrOwnerCheckAndUserSession} from "@/app/actions/auth.action";

export async function createTicket(ticket: Ticket) {
    try{
        const {isAdminOrManager} = await adminOrManagerOrOwnerCheckAndUserSession()

        //----> You must be an admin or manager to create a ticket.
        if (!isAdminOrManager()) {
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

export async function deleteTicketById(id: string) {
    try {
        const {isAdminOrManager} = await adminOrManagerOrOwnerCheckAndUserSession()

        //----> You must be an admin or manager to delete a ticket.
        if (!isAdminOrManager()){
            throw catchError(StatusCodes.FORBIDDEN, "You don't have the permission to delete this resource!");
        }

        //----> Check for existence of ticket.
        await getOneTicket(id);

        //----> Delete the ticket with the given id.
        const response = await prisma.ticket.delete({
            where: {id}
        });

        //----> Send back response.
        return response;
    }catch(error){
        return makeCustomError(error);
    }
}


export async function editTicketById(id: string, ticket: Ticket) {
    try {
        const {isAdminOrManager, ownerCheckByEmailOrAdmin} = await adminOrManagerOrOwnerCheckAndUserSession()

        //----> You must be an admin or manager to edit this resource.
        if (!isAdminOrManager() && !ownerCheckByEmailOrAdmin(ticket.tech)){
            throw catchError(StatusCodes.FORBIDDEN, "You don't have the permission to edit this resource!");
        }

        //----> Check for existence of ticket.
        await getOneTicket(id);

        //----> Edit the ticket with the given id.
        const response = await prisma.ticket.update({
            where: {id},
            data: {...ticket}
        });

        //----> Send back response.
        return response;
    }catch(error){
        return makeCustomError(error);
    }
}

export async function getTicketById(id: string) {
    try {
        const {isAdminOrManager, ownerCheckByEmailOrAdmin} = await adminOrManagerOrOwnerCheckAndUserSession();

        //----> Fetch the ticket with the given id.
        const ticket = await getOneTicket(id);

        //----> You must be an admin or manager to view this page.
        if (!isAdminOrManager() && !ownerCheckByEmailOrAdmin(ticket.tech)){
            throw catchError(StatusCodes.FORBIDDEN, "You don't have the permission to view this page!");
        }

        //----> Send back response.
        return await getOneTicket(id);

    }catch(error){
        return makeCustomError(error);
    }
}

export async function getAllTickets() {
    try {
        const {isAdminOrManager} = await adminOrManagerOrOwnerCheckAndUserSession();

        //----> You must be an admin or manager to view this page.
        if (!isAdminOrManager()){
            throw catchError(StatusCodes.FORBIDDEN, "You don't have the permission to view this page!");
        }

        //----> Fetch all tickets.
        return await prisma.ticket.findMany({})
    }catch (error) {
        return makeCustomError(error);
    }
}

export async function getAllTicketsByEmail(email: string) {
    try {
        const {ownerCheckByEmailOrAdmin} = await adminOrManagerOrOwnerCheckAndUserSession();

        //----> You must be an admin or manager to view this page.
        if (!ownerCheckByEmailOrAdmin(email)){
            throw catchError(StatusCodes.FORBIDDEN, "You don't have the permission to view this page!");
        }

        //----> Fetch all tickets.
        return await prisma.ticket.findMany({where: {tech: email}})
    }catch (error) {
        return makeCustomError(error);
    }
}

export async function ticketJobCompleted(id: string) {
    try {
        //----> Fetch the ticket with the given id.
        const ticket = await getOneTicket(id);

        //----> Update the completed field.
        ticket.completed = !ticket.completed;

        //----> Save the changes in the database.
        const updatedTicket = await prisma.ticket.update({
            where: {id},
            data: {...ticket as Ticket}
        });

        //----> Send back the response.
        return updatedTicket;
    }catch(error){
       console.error(error);
       return makeCustomError(error);
    }

}
