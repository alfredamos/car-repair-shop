import {NextRequest, NextResponse} from "next/server";
import {changeUserRole} from "@/app/actions/auth.action";
import {ChangeUserRole} from "@/validations/auth.validation";
import {CustomError} from "@/utils/customError.util";
import {StatusCodes} from "http-status-codes";

export async function PATCH(req:NextRequest){
    //----> Get the change-password payload.
    const changeUserRolePayload = await req.json() as ChangeUserRole;

    //----> Change user password.
    const response = await changeUserRole(changeUserRolePayload);

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.

    return NextResponse.json(response, {status: StatusCodes.OK});
}