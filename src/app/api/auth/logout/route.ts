import {NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {logoutUser} from "@/app/actions/auth.action";
import {makeCustomError} from "@/utils/makeCustomError";
import {CustomError} from "@/utils/customError.util";

export async function POST(){
    //----> Logout user.
    const response = await logoutUser();

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});


}