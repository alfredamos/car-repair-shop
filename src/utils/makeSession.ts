import {TokenJwt} from "@/app/types/type";
import {Role} from "@prisma/client";

export async function makeSession(user: TokenJwt, accessToken: string){
    //----> Destructure user.
    const {id, name, email, role} = user;

    //----> Set-session and put it in coolike.
    const session = {
        id,
        name,
        email,
        role,
        accessToken,
        isLoggedIn: true,
        isAdmin: role === Role.Admin,
    }

    //----> Send back response.
    return session;
}