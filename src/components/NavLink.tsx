"use client"

import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {useAuthContext} from "@/hooks/useAuthContext";
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {UserSession} from "@/app/types/type";
import axios from "axios";
import {StatusCodes} from "http-status-codes";
import {CustomError} from "@/utils/customError.util";
import {LocalStorageParam} from "@/utils/LocalStorageParam";
import {useRouter} from "next/navigation";

type Props = {
    href: string;
    label: string;
}

export function NavLink({href, label}: Props) {
    const {setAuthSession : setUserResponse} = useAuthContext();
    const {setLocalStorage} = useLocalStorage<UserSession>();

    const router = useRouter();

    const isNotRefresh = href !== "/refresh";

    const refreshUserTokenAction = async () => {
        const response = await axios.post("/api/auth/refresh", {});

        if (response.status !== StatusCodes.OK) throw new CustomError("Server Error", "User token cannot be refreshed", StatusCodes.INTERNAL_SERVER_ERROR);

        setUserResponse(response.data);
        setLocalStorage(LocalStorageParam.authSession, response.data);

        router.refresh();
    }

    return (
        <>
            {isNotRefresh ?
                (
                    <DropdownMenuItem key={label}>
                        <Link href={href} className="py-2 px-4 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition duration-300 w-full">{label}</Link>
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem key={label}>
                        <form action={refreshUserTokenAction} className="py-2 px-4 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition duration-300 w-full">
                            <button type="submit">{label}</button>
                        </form>
                        {/*<Link href={href} className="py-2 px-4 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition duration-300 w-full">{label}</Link>*/}
                    </DropdownMenuItem>
                )}

        </>

    );
}
