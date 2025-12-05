import {prisma} from "@/app/db/prisma.db";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";

export async function getOneUser(userId: string) {
    //----> Fetch the user with the given id.
    const user = await prisma.user.findUnique({
        where: {id: userId},
    });

    //----> Check for null user.
    if (!user) {
        throw catchError(StatusCodes.NOT_FOUND, "User not found in db!");
    }

    //----> Send back response.
    return user;
}