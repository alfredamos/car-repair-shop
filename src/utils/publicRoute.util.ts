const publicRoutes = [
    "/login",
    "/logout",
    "/refresh",
    "/signup",
  //  "/posts",
    "/api/auth/login",
    "/api/auth/logout",
    "/api/auth/refresh",
    "/api/auth/signup",
    "/api/posts",
]

export const isPublicRoute = (route : string) => publicRoutes.includes(route);