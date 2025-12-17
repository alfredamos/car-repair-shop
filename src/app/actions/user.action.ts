"use server"

import {makeCustomError} from "@/utils/makeCustomError";
import {getOneUser} from "@/app/actions/user-helper";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";
import {prisma} from "@/app/db/prisma.db";
import {ResponseMessage} from "@/utils/responseMessage.util";
import {fromUserToUserResponse} from "@/app/actions/auth-helpers";
import {adminOrManagerOrOwnerCheckAndUserSession} from "@/app/actions/auth.action";
import {UserResponse} from "@/app/types/type";

export async function deleteUserById(id: string){
    try{
        const {ownerCheckByUserIdOrAdmin} = await adminOrManagerOrOwnerCheckAndUserSession();

        //----> Check for ownership or admin.
        if (!ownerCheckByUserIdOrAdmin(id)){
            throw catchError(StatusCodes.FORBIDDEN, "You are not permitted to perform this action!");
        }

        //----> Check for existence of user.
        await getOneUser(id);

        //----> Delete the user with the given id.
        await prisma.user.delete({
            where: {id}
        });

        //----> Send back response.
        return new ResponseMessage("User has been deleted successfully!", "success", StatusCodes.OK);

    }catch(error){
        return makeCustomError(error);
    }
}

export async function getUserById(id: string){
    try{
        const {ownerCheckByUserIdOrAdmin} = await adminOrManagerOrOwnerCheckAndUserSession();

        //----> Check for ownership or admin.
        if (!ownerCheckByUserIdOrAdmin(id)){
            throw catchError(StatusCodes.FORBIDDEN, "You are not permitted to perform this action!");
        }

        //----> Send back response.
        return fromUserToUserResponse(await getOneUser(id));

    }catch(error){
        return makeCustomError(error);
    }
}

export async function getAllUsers(query?: string){
    try{
        const {isAdmin} = await adminOrManagerOrOwnerCheckAndUserSession();

        //----> Check for admin privilege.
        if(!isAdmin){
            throw catchError(StatusCodes.FORBIDDEN, "You are not permitted to view this page!");
        }

        //----> Fetch all users.
        //----> Get authors marching the giving query.
        if(query){
            return ((await prisma.user.findMany({where: {
                    OR:[
                        {email : {contains : query}},
                        {name : {contains : query}},
                        {phone : {contains : query}},
                    ],}
            })).map(user => fromUserToUserResponse(user)));
        }

        //----> Fetch all authors.
        return ((await prisma.user.findMany({})).map(user => fromUserToUserResponse(user)));
    }catch (error){
        return makeCustomError(error);
    }

}