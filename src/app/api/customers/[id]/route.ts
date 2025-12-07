import {NextRequest, NextResponse} from "next/server";
import {deleteCustomerById, editCustomerById, getCustomerById} from "@/app/actions/customer.action";
import {StatusCodes} from "http-status-codes";
import {Customer} from "@prisma/client";
import {CustomError} from "@/utils/customError.util";

export async function DELETE(_req: NextRequest, {params}: {params: Promise<{id: string}>}){
    //-----> Get the id from params.
    const {id} = await params;

    //----> Delete the customer with the given id.
    const response = await deleteCustomerById(id);

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

    //----> Fetch the customer with the given id.
    const response = await getCustomerById(id);

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});

}

export async function PATCH(req: NextRequest, {params}: {params: Promise<{id: string}>}){
    //-----> Get the id from params and the customer payload.
    const {id} = await params;
    const customerPayload = await req.json() as Customer;

    //----> Edit the customer with the given id.
    const response = await editCustomerById(id, customerPayload);

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});

}