import {CookieParam} from "@/utils/cookieParam.util";
import {cookies} from "next/headers";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";
import {Role} from "@prisma/client";
import * as jwt from "jsonwebtoken";
import {TokenJwt, UserSession} from "@/app/types/type";
import {getAccessToken} from "@/utils/getAccessToken";

export async function getSession() : Promise<UserSession> {


    const {accessToken, cookieStore}  = await getAccessToken();

    //----> Check for null token.
    if (!accessToken) {
        throw catchError(StatusCodes.UNAUTHORIZED, "Could not find access token");
    }

    //----> Validate token.
    const tokenJwt = validateUserToken(accessToken);
    if (!tokenJwt) {
        const session : UserSession = {
            id: "",
            name: "",
            email: "",
            accessToken: "",
            role: Role.User,
            isAdmin: false,
            isLoggedIn: false,
        }
        return session;
    }

    //----> Get session from cookie.
    const sessionString = cookieStore.get(CookieParam.sessionTokenName)?.value as string;

    //----> Check for null session
    if (!sessionString) {
        throw catchError(StatusCodes.UNAUTHORIZED, "Could not find session!");
    }

    //----> Parse session
    const session = JSON.parse(sessionString) as UserSession;

    //----> Send back session.
    return session;

}

export function validateUserToken(token: string){
    //----> Verify the jwt-token
    try {
        const tokenJwt = jwt?.verify(token, process.env.JWT_TOKEN_KEY!) as TokenJwt;
        return tokenJwt
    }catch(_error: unknown) {
        throw catchError(StatusCodes.UNAUTHORIZED, "Could not find token!");
    }

}

function getUserCredential(tokenJwt: TokenJwt, token: string){
    const userResponse : UserSession = {
        id: tokenJwt.id,
        name: tokenJwt.name,
        email: tokenJwt.email,
        role: tokenJwt.role,
        accessToken: token,
        isLoggedIn: true,
        isAdmin: tokenJwt.role === Role.Admin,
    }

    return userResponse;

}

const USER_NOT_LOGIN : UserSession = {
    id: "",
    name: "",
    email: "",
    role: Role.User,
    accessToken: "",
    isLoggedIn: false,
    isAdmin: false,
}