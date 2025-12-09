export class CookieParam {
    public static accessTokenName: string = "accessToken";
    public static accessTokenPath: string = "/";
    public static accessTokenExpireIn: number = 15 * 60 * 1000;

    public static sessionTokenName: string = "sessionToken";
    public static sessionTokenPath: string = "/";
    public static sessionTokenExpireIn: number = 7 * 24 * 60 * 60 * 1000;

    public static refreshTokenName: string = "refreshToken";
    public static refreshTokenPath: string = "/api/auth/refresh";
    public static refreshTokenExpireIn: number = 7 * 24 * 60 * 60 * 1000;
}