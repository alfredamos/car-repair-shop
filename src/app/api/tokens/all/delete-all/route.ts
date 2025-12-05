import {deleteAllInvalidTokens} from "@/app/actions/token.action";
import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {CustomError} from "@/utils/customError.util";

export async function DELETE(){
    //----> Delete all invalid tokens by all users.
    const response = await deleteAllInvalidTokens();

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}