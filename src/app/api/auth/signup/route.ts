import {NextRequest, NextResponse} from "next/server";
import {SignupUser} from "@/validations/auth.validation";
import {signupUser} from "@/app/actions/auth.action";
import {StatusCodes} from "http-status-codes";

export async function POST(req:NextRequest){
    //----> Get the signup-user payload.
    const signupPayload = await req.json() as SignupUser;

    console.log("In signup-route, signup :", signupPayload);

    //----> Signup new user.
    const response = await signupUser(signupPayload);

    if (response instanceof Error){
        NextResponse.json(response, {status: StatusCodes.INTERNAL_SERVER_ERROR});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}