import {Gender, Role} from "@prisma/client";


type TokenJwt = {
    id: string;
    name: string;
    email: string;
    role: Role;
}

type UserSession = {
    id: string;
    name: string;
    email: string;
    role: Role;
    accessToken: string;
    isLoggedIn: boolean;
    isAdmin: boolean;
}

type UserResponse = {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: Role;
    gender: Gender;
    image: string;
}
