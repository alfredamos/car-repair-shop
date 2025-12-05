import {NextResponse} from "next/server";
import {getAllUsers} from "@/app/actions/user.action";
import {CustomError} from "@/utils/customError.util";
import {StatusCodes} from "http-status-codes";

export async function GET(){

    //----> Fetch all users.
    const response = await getAllUsers();

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}