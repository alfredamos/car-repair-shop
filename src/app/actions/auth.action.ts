"use server"

import catchError from "http-errors"

import {
    ChangeUserPassword,
    ChangeUserRole,
    EditUserProfile,
    LoginUser,
    SignupUser
} from "@/validations/auth.validation";
import {
    deleteCookieObj,
    findUserByEmail, fromUserToUserResponse,
    generateTokenAndSignInUser,
    isCorrectPassword,
    isPasswordMatch
} from "@/app/actions/auth-helpers";
import {StatusCodes} from "http-status-codes";
import * as bcrypt from "bcryptjs";
import {prisma} from "@/app/db/prisma.db";
import {ResponseMessage} from "@/utils/responseMessage.util";
import {TokenJwt, UserSession} from "@/app/types/type";
import {cookies} from "next/headers";
import {CookieParam} from "@/utils/cookieParam.util";
import {validateUserToken} from "@/utils/validateToken";
import {getAccessToken} from "@/utils/getAccessToken";
import {findTokenByAccessToken, revokedTokensByUserId} from "@/app/actions/token.action";
import {makeCustomError} from "@/utils/makeCustomError";
import {Role, User} from "@prisma/client";
import {redirect} from "next/navigation";
import {CustomError} from "@/utils/customError.util";

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

        //----> Delete access-token and user-session.
        await deleteCookieObj(CookieParam.accessTokenName, CookieParam.accessTokenPath)
        await deleteCookieObj(CookieParam.sessionTokenName, CookieParam.sessionTokenPath)

        //----> Send back response.
        redirect("/login")
    }catch(error){
        throw error;
    }

}

export async function refreshUserToken(){
    try{
        //----> Get the refresh-token from refresh.
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get(CookieParam.refreshTokenName)?.value as string;

        console.log("Refresh User, cookieStore: ", cookieStore);
        console.log("Refresh token : ", refreshToken);

        //----> Check for validity of token.
        const tokenJwt = validateUserToken(refreshToken);

        //----> Generate access-token, refresh-token and session.
        return await generateTokenAndSignInUser(tokenJwt);
    }catch(error){
        throw error;
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

export async function changeUserRole(changeRoleOfUser: ChangeUserRole){
    try {
        //----> Only admin can change role of user.
        const {isAdmin} = await getSession();

        //----> Check for admin privilege.
        if (!isAdmin) {
            throw catchError(StatusCodes.FORBIDDEN, "You don't have permission to change User Role!");
        }

        //----> Destructure the change-user-role payload.
        const {email, role} = changeRoleOfUser;

        //----> Check for existence of user.
        const user = await findUserByEmail(email);

        //----> Change the user role.
        const updatedUser = await prisma.user.update({where:{email},
            data: {...user, role}
        });

        //----> Send back response.
        return updatedUser;
    }catch(error){
        console.log("At point 4, in change-user-role, error : ", (error as CustomError).message);
        return makeCustomError(error);
    }

}

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


export async function adminOrManagerOrOwnerCheckAndUserSession() {
    //----> Get session.
    const session = await getSession();

    //----> Check for admin privilege.
    const isAdmin = session.isAdmin;

    //----> Check for managerial privilege.
    const isManager = session.role === Role.Manager;

    //----> Checks for admin or manager privilege.
    const isAdminOrManager = () => isManager || isAdmin;

    //----> Checks for admin or same user by userId.
    const ownerCheckByUserIdOrAdmin = (idFromResource: string) => {
        //----> Check for owner (same user), when id of login user is equal to userId on resource.
        const isSameUser = idFromResource.normalize() === (session.id).normalize();

        //----> Either same user or admin.
        return isSameUser || isAdmin;
    }

    //----> Checks for admin or same user by userId.
    const ownerCheckByEmailOrAdmin = (email: string) => {
        //----> Check for owner (same user), when id of login user is equal to userId on resource.
        const isSameUser = email.normalize() === (session.email).normalize();

        //----> Either same user or admin.
        return isSameUser || isAdmin;
    }

    return {isAdmin, isAdminOrManager, isManager, ownerCheckByUserIdOrAdmin, ownerCheckByEmailOrAdmin, session};
}

