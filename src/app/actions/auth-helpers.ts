import * as bcrypt from 'bcryptjs';
import {prisma} from "@/app/db/prisma.db";
import catchError from "http-errors";
import {StatusCodes} from "http-status-codes";
import {createToken, revokedTokensByUserId} from "@/app/actions/token.action";
import {Role, Token, User} from "@prisma/client";
import * as jwt from "jsonwebtoken";
import {cookies} from "next/headers";
import {CookieParam} from "@/utils/cookieParam.util";
import {TokenJwt, UserResponse} from "@/app/types/type";
import {setCookie} from "@/utils/setCookie";
import {setSession} from "@/utils/setSession";
import {makeSession} from "@/utils/makeSession";

export function isPasswordMatch(passwordOne: string, passwordTwo: string) : boolean {
    return passwordOne === passwordTwo;
}

export function isCorrectPassword(rawPassword: string, encodedPassword: string) : Promise<boolean> {
    return bcrypt.compare(rawPassword, encodedPassword);
}

export async function findUserByEmail(email: string){
    //----> Fetch the matching user by user id.
    const user = await prisma.user.findUnique({where:{email}});

    //----> Check for null user.
    if (!user){
        throw catchError(StatusCodes.NOT_FOUND, "User not found in the database!");
    }

    //----> Send back response.
    return user;
}

import {TokenType} from "@prisma/client";

export function makeNewToken(accessToken: string, refreshToken: string, userId: string) {
    //----> Make new token.
    return {accessToken, refreshToken, userId, expired: false, revoked: false, tokenType: TokenType.Bearer};
}



export async function generateTokenAndSignInUser(user: TokenJwt){
    const {id, name, email, role} = user;
    //----> Invalidate all valid tokens.
    await revokedTokensByUserId(user.id);

    //----> Generate access-token and store it in cookie.
    const accessToken = await generateToken(id, name, email, role, CookieParam.accessTokenExpireIn);
    await setCookie(CookieParam.accessTokenName, accessToken, CookieParam.accessTokenPath, CookieParam.accessTokenExpireIn);

    //----> Set session and store it in cookie
    const session = await makeSession(user, accessToken);
    await setSession(session);

    //----> Generate refresh token and store it in cookie.
    const refreshToken = await generateToken(id, name, email, role, CookieParam.accessTokenExpireIn);
    await setCookie(CookieParam.refreshTokenName, refreshToken, CookieParam.refreshTokenPath, CookieParam.refreshTokenExpireIn);

    //----> Make token object and store it in token db.
    const tokenObject = makeNewToken(accessToken, refreshToken, user.id) as unknown as Token;
    await createToken(tokenObject as Token)

    //----> Send back access token.
    return session;
}

export async function generateToken(id: string, name: string, email: string, role: Role, expiresIn: number){
    return jwt.sign(
        {
            id,
            name,
            role,
            email
        },
        process.env.JWT_TOKEN_KEY!,
        {expiresIn}
    );
}

export async function deleteCookie(cookieName: string){
    const cookieStore = await cookies();
    cookieStore.delete(cookieName);
}

export function fromUserToUserResponse(user: User): UserResponse{
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        image: user.image,
        role: user.role,
    }
}
