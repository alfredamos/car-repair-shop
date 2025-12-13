import {createCustomer, getAllCustomers} from "@/app/actions/customer.action";
import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {CustomError} from "@/utils/customError.util";
import {Customer} from "@prisma/client";

export async function GET(){
    //----> Fetch all customers from db.
    const response = await getAllCustomers();

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});

}

export async function POST(req: NextRequest, ){
    //-----> Get the customer payload.
    const customerPayload = await req.json() as Customer;

    //----> Create new customer.
    const response = await createCustomer(customerPayload);

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});

}