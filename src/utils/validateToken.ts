import {CookieParam} from "@/utils/cookieParam.util";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";
import {Role} from "@prisma/client";
import * as jwt from "jsonwebtoken";
import {TokenJwt, UserSession} from "@/app/types/type";


export function validateUserToken(token: string){
    //----> Verify the jwt-token
    try {
        const tokenJwt = jwt?.verify(token, process.env.JWT_TOKEN_KEY!) as TokenJwt;
        return tokenJwt
    }catch(_error: unknown) {
        throw catchError(StatusCodes.UNAUTHORIZED, "Could not find token!");
    }

}

