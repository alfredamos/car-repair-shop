import {NextRequest, NextResponse} from "next/server";
import {Customer} from "@prisma/client";
import {activateOrDeactivateCustomer, editCustomerById} from "@/app/actions/customer.action";
import {CustomError} from "@/utils/customError.util";
import {StatusCodes} from "http-status-codes";

export async function PATCH(req: NextRequest, {params}: {params: Promise<{id: string}>}){
    //-----> Get the id from params and the customer payload.
    const {id} = await params;
    const customerPayload = await req.json() as Customer;

    //----> Activate or deactivate customer with the given id.
    const response = await activateOrDeactivateCustomer(id);

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});

}