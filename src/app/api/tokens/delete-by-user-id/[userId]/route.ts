import {NextRequest, NextResponse} from "next/server";
import {deleteInvalidTokensByUserId} from "@/app/actions/token.action";
import {CustomError} from "@/utils/customError.util";
import {StatusCodes} from "http-status-codes";

export async function DELETE(_req:NextRequest, {params}:{params:Promise<{userId:string}>}){
    //----> Extract the userId from params.
    const {userId} = await params;

    //----> Delete all invalid tokens associated with this user.
    const response = await deleteInvalidTokensByUserId(userId);

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}