"use server"

import {Token, TokenType} from "@prisma/client";
import {prisma} from "@/app/db/prisma.db";
import {QueryCondition} from "@/utils/queryCondition";
import {StatusCodes} from "http-status-codes";
import {ResponseMessage} from "@/utils/responseMessage.util";
import {CustomError} from "@/utils/customError.util";

export  async function deletedTokensByQuery(queryCondition: QueryCondition) {
    const invalidTokens = findInvalidOrValidTokens(queryCondition);

    //----> Collect all invalid tokens id in an array.
    const invalidTokenIds = (await invalidTokens).map(token => token.id);

    //----> Delete all in valid tokens.
    const batchDeletedTokens = await prisma.token.deleteMany({
        where: {
            id: {
                in: invalidTokenIds
            }
        }
    });

    //----> Check for empty counts.
    if (!batchDeletedTokens.count) {
        throw new CustomError("Not found", "No invalid tokens to delete!", StatusCodes.NOT_FOUND);
    }

    //----> Send back response.
    return new ResponseMessage("All invalid tokens have been deleted!", "success", StatusCodes.OK);
}

export async function findInvalidOrValidTokens(queryCondition: QueryCondition) {
    //----> Retrieve valid or invalid tokens.
    return prisma.token.findMany({where: queryCondition});
}

export async function invalidateTokensAndSave(tokens : Token[]) {
    //----> Invalidate tokens and save them in the db.
    const invalidatedTokens = tokens.map(async token => {
        token.expired = true;
        token.revoked = true;
        return prisma.token.update({
            where: {id : token.id},
            data: {...token}
        })
    });

    //----> Send back response.
    return Promise.all(invalidatedTokens);
}

export async function getOneToken(accessToken: string)  {
    //----> Fetch the token object with the given access-token.
    const token = await prisma.token.findUnique({where:{accessToken}});

    //----> Check for error.
    if (!token) {
        throw new CustomError("Not found", "Token is not found.", StatusCodes.NOT_FOUND);
    }

    return token;

}



