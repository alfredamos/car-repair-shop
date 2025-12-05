import {NextRequest, NextResponse} from "next/server";
import {ChangeUserPassword} from "@/validations/auth.validation";
import {changeUserPassword} from "@/app/actions/auth.action";
import {StatusCodes} from "http-status-codes";
import {CustomError} from "@/utils/customError.util";

export async function PATCH(req:NextRequest){
    //----> Get the change-password payload.
    const changePasswordPayload = await req.json() as ChangeUserPassword;

    //----> Change user password.
    const response = await changeUserPassword(changePasswordPayload);

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}