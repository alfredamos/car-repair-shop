"use server"

import catchError from "http-errors"

import {ChangeUserPassword, EditUserProfile, LoginUser, SignupUser} from "@/validations/auth.validation";
import {
    deleteCookie,
    findUserByEmail, fromUserToUserResponse,
    generateTokenAndSignInUser,
    isCorrectPassword,
    isPasswordMatch
} from "@/app/actions/auth-helpers";
import {StatusCodes} from "http-status-codes";
import * as bcrypt from "bcryptjs";
import {prisma} from "@/app/db/prisma.db";
import {ResponseMessage} from "@/utils/responseMessage.util";
import {TokenJwt} from "@/app/types/type";
import {cookies} from "next/headers";
import {CookieParam} from "@/utils/cookieParam.util";
import {getSession, validateUserToken} from "@/utils/getSession";
import {getAccessToken} from "@/utils/getAccessToken";
import {findTokenByAccessToken, revokedTokensByUserId} from "@/app/actions/token.action";
import {makeCustomError} from "@/utils/makeCustomError";
import {Role, User} from "@prisma/client";

export async function changeUserPassword(changeUserPassword: ChangeUserPassword){
    //----> Destructure change-user-password payload.
    const {password, confirmPassword, newPassword, email} = changeUserPassword;

    try {
        //----> Check for password match.
        if (!isPasswordMatch(newPassword, confirmPassword)) {
            throw catchError(StatusCodes.BAD_REQUEST, "Passwords do not match!");
        }

        //----> Check for existence of user.
        const user = await findUserByEmail(email)

        //----> Check for valid password.
        if (! await isCorrectPassword(password, user.password)) {
            throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
        }

        //----> Hash the new password.
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        //----> Save the changes to the database.
        await prisma.user.update({
            where:{email},
            data: {...user, password: hashedPassword},
        })

        //----> Send back response.
        return new ResponseMessage("Password has been changed successfully!", "success", StatusCodes.OK);
    }catch (error){
        console.error(error);
        return makeCustomError(error);
    }

}

export async function editUserProfile(editUser: EditUserProfile){
    //----> Destructure edit-user payload.
    const {email, password} = editUser;

    try{
        //----> Check for existence of user.
        const user = await findUserByEmail(email);

        //----> Check for correct password.
        if (! await isCorrectPassword(password, user.password)) {
            throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
        }

        //----> Save the changes in db.
        await prisma.user.update({
            where:{email},
            data: {...editUser, password: user.password, role: user.role},
        })

        //----> Send back response.
        return new ResponseMessage("Profile has been changed successfully!", "success", StatusCodes.OK);
    }catch(error){
        console.error(error);
        return makeCustomError(error);
    }

}

export async function getCurrentUser(){
    try{
        //----> Get session.
        const session = await getSession();

        //----> Check for null session.
        if(!session){
            throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
        }

        //----> Get the current user from session.
        return  fromUserToUserResponse(await findUserByEmail(session.email));
    }catch(error){
        return makeCustomError(error);
    }

}

export async function loginUser(login: LoginUser){
    //----> Destructure change-user-password payload.
    const {password,  email} = login;

    try{
        //----> Check for existence of user.
        const user = await findUserByEmail(email);

        //----> Check for valid password.
        if (! (await isCorrectPassword(password, user.password))) {
            throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
        }

        //----> Get token parameters.
        const tokenJwt: TokenJwt = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
        //----> Generate access-token, refresh-token and session.
        return await generateTokenAndSignInUser(tokenJwt);
    }catch(error){
        return makeCustomError(error);
    }

}

export async function logoutUser(){
    try {
        //----> Get access-token.
        const {accessToken} = await getAccessToken();

        console.log("In log-out, accessToken : ", accessToken);

        //----> Fetch token object with the given access-token
        const tokenObj = await findTokenByAccessToken(accessToken);

        console.log("In log-out, tokenObj : ", tokenObj);

        //----> Check for null tokenObject.
        if (!tokenObj) {
            throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
        }

        //----> Invalidate all valid token associated with this user.
        await revokedTokensByUserId(tokenObj.userId);

        //----> Delete all tokens and user-session.
        await deleteCookie(CookieParam.accessTokenName);
        await deleteCookie(CookieParam.refreshTokenName);
        await deleteCookie(CookieParam.sessionTokenName);

        //----> Send back response.
        return new ResponseMessage("Logged out is successful!", "success", StatusCodes.OK);
    }catch(error){
        return makeCustomError(error);
    }

}

export async function refreshUserToken(){
    try{
        //----> Get the refresh-token from refresh.
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get(CookieParam.refreshTokenName)?.value as string;

        //----> Check for validity of token.
        const tokenJwt = validateUserToken(refreshToken);

        //----> Generate access-token, refresh-token and session.
        return await generateTokenAndSignInUser(tokenJwt);
    }catch(error){
        return makeCustomError(error);
    }

}

export async function signupUser(signup: SignupUser){
    console.log("In signup-action, signup :", signup);
    //----> Destructure change-user-password payload.
    const {password, confirmPassword, email} = signup;
    const {confirmPassword : cfmPassword, ...rest} = signup;

    try {
        //----> Check for password match.
        if (!isPasswordMatch(password, confirmPassword)) {
            throw catchError(StatusCodes.BAD_REQUEST, "Passwords do not match!");
        }

        //----> Check for existence of user.
        const user = await prisma.user.findUnique({where:{email}});
        if (user){
            throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
        }

        //----> Hash the new password.
        const hashedPassword = await bcrypt.hash(password, 12);

        //----> Save the new user in the db.
        const userToCreate = {...rest, password: hashedPassword, role: Role.User} as User;
        const newUser = await prisma.user.create({
            data: {...userToCreate},
        })

        //----> Send back response.
        return fromUserToUserResponse(newUser);

    }catch(error){
        return makeCustomError(error);
    }
}

