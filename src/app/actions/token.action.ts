"use server"

import {Token} from "@prisma/client"
import {prisma} from "@/app/db/prisma.db";
import {ResponseMessage} from "@/utils/responseMessage.util";
import {CustomError} from "@/utils/customError.util";
import {QueryConditionUtil} from "@/utils/queryCondition.util";
import {
    deletedTokensByQuery,
    findInvalidOrValidTokens,
    getOneToken,
    invalidateTokensAndSave
} from "@/app/actions/token-helper";
import {StatusCodes} from "http-status-codes";
import catchError from "http-errors";
import {makeCustomError} from "@/utils/makeCustomError";
import {adminOrManagerOrOwnerCheckAndUserSession} from "@/app/actions/auth.action";

export async function createToken(token: Token){
    //----> Insert the token into db.
    await prisma.token.create({
        data: {...token}
    })

    //----> Send back the response.
    return new ResponseMessage("Token has been created successfully!", "success", StatusCodes.CREATED);
}

export async function deleteInvalidTokensByUserId(userId: string){
    try{
        const {ownerCheckByUserIdOrAdmin} = await adminOrManagerOrOwnerCheckAndUserSession();

        //----> Check for ownership or admin.
        if (!ownerCheckByUserIdOrAdmin(userId)){
            throw new CustomError("Forbidden", "You don't have permission to view or perform any action on this page!", StatusCodes.FORBIDDEN)
        }

        //----> Retrieve invalid tokens by user id.
        const queryCondition: QueryConditionUtil = {
            userId,
            expired: true,
            revoked: true
        };

        console.log("In delete-invalid-tokens, queryCondition : ", queryCondition);

        //----> Delete all invalid tokens by user id.
        return await deletedTokensByQuery(queryCondition);
    }catch(error){
        return makeCustomError(error);
    }

}

export async function  deleteAllInvalidTokens(){
    try{
        const {isAdmin} = await adminOrManagerOrOwnerCheckAndUserSession();

        //----> Must be an admin.
        if (!isAdmin){
            throw new CustomError("Forbidden", "You don't permission to view or perform this action!", StatusCodes.FORBIDDEN)
        }
        //----> Retrieve all invalid tokens.
        const queryCondition: QueryConditionUtil = {
            expired: true,
            revoked: true
        };

        //----> Delete all invalid tokens.
        return await deletedTokensByQuery(queryCondition);
    }catch(error){
        return makeCustomError(error);
    }

}

export async function findTokenByAccessToken(accessToken: string){
    //----> Check for empty access-token.
    if (!accessToken){
        throw catchError(StatusCodes.UNAUTHORIZED, "Access token is missing!");
    }

    //----> Fetch the token object with the given access-token.
    const token = await getOneToken(accessToken);

    //----> Check for error.
    if (!token){
        throw new CustomError("Not found", "Token not found in db!", StatusCodes.FORBIDDEN)
    }

    //----> Send back response.
    return token;
}

export async function findAllValidTokensByUserId(userId: string){
    //----> Retrieve all valid tokens.
    const queryCondition : QueryConditionUtil = {
        userId,
        revoked:false,
        expired:false
    }

    //----> Send back valid tokens.
    return findInvalidOrValidTokens(queryCondition);
}

export async function revokedTokensByUserId(userId: string){
    //----> Retrieve all valid tokens.
    const validTokens = await findAllValidTokensByUserId(userId);

    //----> invalidate tokens and save them in the db.
    return invalidateTokensAndSave(validTokens);
}

