"use server"

import {cookies} from "next/headers";
import {CookieParam} from "@/utils/cookieParam.util";

export async function getAccessToken() {
    //----> Get access-token
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(CookieParam.accessTokenName)?.value as string;
    return {accessToken, cookieStore};
}