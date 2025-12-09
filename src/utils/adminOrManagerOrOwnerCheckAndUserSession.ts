import {Role} from "@prisma/client";
import {getSession} from "@/app/actions/auth.action";

export async function adminOrManagerOrOwnerCheckAndUserSession() {
    //----> Get session.
    const session = await getSession();

    //----> Check for admin privilege.
    const isAdmin = session.isAdmin;

    //----> Check for managerial privilege.
    const isManager = session.role === Role.Manager;

    console.log("In adminOrManagerCheckAndInfo, isAdmin : ", isAdmin);
    console.log("In adminOrManagerCheckAndInfo, isManager : ", isManager);

    //----> Checks for admin or manager privilege.
    const isAdminOrManager = () => isManager || isAdmin;

    //----> Checks for admin or same user by userId.
    const ownerCheckByUserIdOrAdmin = (idFromResource: string) => {
        //----> Check for owner (same user), when id of login user is equal to userId on resource.
        const isSameUser = idFromResource.normalize() === (session.id).normalize();

        console.log("In adminOrManagerCheckAndInfo, isManager : ", isSameUser);

        //----> Either same user or admin.
        return isSameUser || isAdmin;
    }

    //----> Checks for admin or same user by userId.
    const ownerCheckByEmailOrAdmin = (email: string) => {
        //----> Check for owner (same user), when id of login user is equal to userId on resource.
        const isSameUser = email.normalize() === (session.email).normalize();

        console.log("In adminOrManagerCheckAndInfo, isManager : ", isSameUser);

        //----> Either same user or admin.
        return isSameUser || isAdmin;
    }

    return {isAdmin, isAdminOrManager, isManager, ownerCheckByUserIdOrAdmin, ownerCheckByEmailOrAdmin, session};
}