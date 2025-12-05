import {NextRequest, NextResponse} from "next/server";
import {EditUserProfile} from "@/validations/auth.validation";
import {editUserProfile} from "@/app/actions/auth.action";
import {StatusCodes} from "http-status-codes";
import {CustomError} from "@/utils/customError.util";

export async function PATCH(req:NextRequest){
    //----> Get the edit-user payload.
    const editUserPayload = await req.json() as EditUserProfile;

    //----> Edit user password.
    const response = await editUserProfile(editUserPayload);

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}