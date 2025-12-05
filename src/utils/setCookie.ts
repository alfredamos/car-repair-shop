import {cookies} from "next/headers";

export async function setCookie(cookieName: string, cookieValue: string, cookiePath: string, maxAge: number) {
    //----> Initialize cookie.
    const cookie = await cookies();

    //----> set cookie.
    cookie.set(cookieName, cookieValue, {
        httpOnly: true,
        secure: false,
        path: cookiePath,
        maxAge
    })
}
