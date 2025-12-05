import {NextResponse} from "next/server";
import {getCurrentUser} from "@/app/actions/auth.action";
import {StatusCodes} from "http-status-codes";
import {CustomError} from "@/utils/customError.util";

export async function GET(){
    //----> Fetch the current-user.
    const response = await getCurrentUser();

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}