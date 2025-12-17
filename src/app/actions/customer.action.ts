"use server"

import {Customer, Ticket} from "@prisma/client"
import {prisma} from "@/app/db/prisma.db";
import {makeCustomError} from "@/utils/makeCustomError";
import {StatusCodes} from "http-status-codes";
import catchError from "http-errors";
import {getOneCustomer} from "@/app/actions/customer-helper";
import {adminOrManagerOrOwnerCheckAndUserSession} from "@/app/actions/auth.action";
import {TicketQueryCondition} from "@/utils/TicketQueryCondition";
import {CustomerQueryCondition} from "@/app/types/type";

export async function activateOrDeactivateCustomer(id: string){
    try{
        const {isAdminOrManager, session} = await adminOrManagerOrOwnerCheckAndUserSession();

        //----> You must be an admin or manager to create a customer.
        if (!isAdminOrManager()) {
            throw catchError(StatusCodes.FORBIDDEN, "You don't have the permission to create a customer!");
        }

        //----> Fetch the customer to activate.
        const customer = await getOneCustomer(id);

        //----> Store the new-customer in the db.
        customer.active = !customer.active;
        const newCustomer = await prisma.customer.update({
            where: {id},
            data: {...customer}
        });

        //----> Send back response.
        return newCustomer;
    }catch(error){
        return makeCustomError(error);
    }

}

export async function createCustomer(customer: Customer) {
    try{
        const {isAdminOrManager, session} = await adminOrManagerOrOwnerCheckAndUserSession();

        //----> You must be an admin or manager to create a customer.
        if (!isAdminOrManager()) {
            throw catchError(StatusCodes.FORBIDDEN, "You don't have the permission to create a customer!");
        }

        //----> Store the new-customer in the db.
        customer.userId = session.id;
        customer.dateOfBirth = new Date(customer.dateOfBirth);
        const newCustomer = await prisma.customer.create({
            data: {...customer}
        });

        //----> Send back response.
        return newCustomer;
    }catch(error){
        return makeCustomError(error);
    }

}

export async function deleteCustomerById(id: string) {
    try {
        const {isAdminOrManager} = await adminOrManagerOrOwnerCheckAndUserSession()

        //----> You must be an admin or manager to delete a customer.
        if (!isAdminOrManager()){
            throw catchError(StatusCodes.FORBIDDEN, "You don't have the permission to delete this resource!");
        }

        //----> Check for existence of customer.
        await getOneCustomer(id);

        //----> Delete the customer with the given id.
        const response = await prisma.customer.delete({
            where: {id}
        });

        //----> Send back response.
        return response;
    }catch(error){
        return makeCustomError(error);
    }
}


export async function editCustomerById(id: string, customer: Customer) {
    try {
        const {isAdminOrManager} = await adminOrManagerOrOwnerCheckAndUserSession()

        //----> You must be an admin or manager to edit this resource.
        if (!isAdminOrManager()){
            throw catchError(StatusCodes.FORBIDDEN, "You don't have the permission to edit this resource!");
        }

        //----> Check for existence of customer.
        await getOneCustomer(id);

        //----> Edit the customer with the given id.
        customer.dateOfBirth = new Date(customer.dateOfBirth);
        const response = await prisma.customer.update({
            where: {id},
            data: {...customer}
        });

        //----> Send back response.
        return response;
    }catch(error){
        return makeCustomError(error);
    }
}

export async function getCustomerById(id: string) {
    try {
        const {isAdminOrManager} = await adminOrManagerOrOwnerCheckAndUserSession()

        //----> You must be an admin or manager to view this page.
        if (!isAdminOrManager()){
            throw catchError(StatusCodes.FORBIDDEN, "You don't have the permission to view this page!");
        }

        //----> Check for existence of customer.
        return await getOneCustomer(id);

    }catch(error){
        return makeCustomError(error);
    }
}

export async function getCustomerByTicket(ticket: Ticket) {
    try {
        const {isAdminOrManager, ownerCheckByEmailOrAdmin} = await adminOrManagerOrOwnerCheckAndUserSession()

        //----> You must be an admin or manager to view this page.
        if (!isAdminOrManager() && !ownerCheckByEmailOrAdmin(ticket.tech)){
            throw catchError(StatusCodes.FORBIDDEN, "You don't have the permission to view this page!");
        }

        //----> Check for existence of customer.
        return await getOneCustomer(ticket.customerId);

    }catch(error){
        return makeCustomError(error);
    }
}

export async function getAllCustomers() {
    try {
        const {isAdminOrManager} = await adminOrManagerOrOwnerCheckAndUserSession();

        //----> You must be an admin or manager to view this page.
        if (!isAdminOrManager()){
            throw catchError(StatusCodes.FORBIDDEN, "You don't have the permission to view this page!");
        }

        //----> Fetch all customers.
        return await prisma.customer.findMany({})
    }catch (error) {
        return makeCustomError(error);
    }
}

export async function getAllActiveCustomers() {
    try {
        const {isAdminOrManager} = await adminOrManagerOrOwnerCheckAndUserSession();

        //----> You must be an admin or manager to view this page.
        if (!isAdminOrManager()){
            throw catchError(StatusCodes.FORBIDDEN, "You don't have the permission to view this page!");
        }

        //----> Fetch all customers.
        const query : CustomerQueryCondition = {active: true};
        return await getCustomersByQueryCondition(query);
    }catch (error) {
        return makeCustomError(error);
    }
}

export async function getAllInActiveCustomers() {
    try {
        const {isAdminOrManager} = await adminOrManagerOrOwnerCheckAndUserSession();

        //----> You must be an admin or manager to view this page.
        if (!isAdminOrManager()){
            throw catchError(StatusCodes.FORBIDDEN, "You don't have the permission to view this page!");
        }

        //----> Fetch all customers.
        const query : CustomerQueryCondition = {active: false};
        return await getCustomersByQueryCondition(query);
    }catch (error) {
        return makeCustomError(error);
    }
}

async function getCustomersByQueryCondition(query: CustomerQueryCondition){
    //----> Fetch customers matching by given query.
    return await prisma.customer.findMany({where: query});
}
