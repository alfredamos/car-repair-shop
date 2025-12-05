import {NextRequest, NextResponse} from "next/server";
import {StatusCodes} from "http-status-codes";
import {LoginUser} from "@/validations/auth.validation";
import {loginUser} from "@/app/actions/auth.action";
import {CustomError} from "@/utils/customError.util";

export async function POST(req:NextRequest){
    //----> Get the login payload.
    const loginPayload = await req.json() as LoginUser;

    //----> Login user.
    const response = await loginUser(loginPayload);

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}