import {Customer} from "@prisma/client";
import {prisma} from "@/app/db/prisma.db";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";

export async function getOneCustomer(id: string){
    //----> Fetch the customer with the given id.
    const customer = await prisma.customer.findUnique({where: {id: id}});

    //----> Check for null customer.
    if(!customer){
        throw catchError(StatusCodes.NOT_FOUND, "No customer found.");
    }

    //----> Send back response.
    return customer;
}