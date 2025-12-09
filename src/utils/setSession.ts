import {UserSession} from "@/app/types/type";
import {setCookie} from "@/utils/setCookie";
import {CookieParam} from "@/utils/cookieParam.util";

export async function setSession(session: UserSession) {
    //----> Set user session.
    await setCookie(CookieParam.sessionTokenName, JSON.stringify(session), CookieParam.sessionTokenPath, CookieParam.sessionTokenExpireIn);
}
