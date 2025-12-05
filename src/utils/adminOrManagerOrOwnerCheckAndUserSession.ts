import {Role} from "@prisma/client";
import {getSession} from "@/utils/getSession";

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

    //----> Checks for admin or same user.
    const ownerCheckOrAdmin = (idFromResource: string) => {
        //----> Check for owner (same user), when id of login user is equal to userId on resource.
        const isSameUser = idFromResource === session.id;

        console.log("In adminOrManagerCheckAndInfo, isManager : ", isSameUser);

        //----> Either same user or admin.
        return isSameUser || isAdmin;
    }

    return {isAdmin, isAdminOrManager, isManager, ownerCheckOrAdmin, session};
}