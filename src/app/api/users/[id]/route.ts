import {NextRequest, NextResponse} from "next/server";
import {deleteUserById, getUserById} from "@/app/actions/user.action";
import {CustomError} from "@/utils/customError.util";
import {StatusCodes} from "http-status-codes";

export async function DELETE(_req: NextRequest, {params}:{params: Promise<{id:string}>}){
    //----> Get the id of the user to delete from params.
    const {id}= await params;

    //----> Delete the user with the given id.
    const response = await deleteUserById(id);

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}

export async function GET(_req: NextRequest, {params}:{params: Promise<{id:string}>}){
    //----> Get the id of the user to delete from params.
    const {id}= await params;

    //----> Delete the user with the given id.
    const response = await getUserById(id);

    //----> Check for error.
    if (response instanceof CustomError){
        return NextResponse.json(response, {status: response.status});
    }

    //----> Send back response.
    return NextResponse.json(response, {status: StatusCodes.OK});
}