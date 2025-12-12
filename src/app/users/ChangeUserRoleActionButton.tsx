"use client"

import {Button} from "@/components/ui/button";
import {Role} from "@prisma/client";
import {useRouter} from "next/navigation";
import axios from "axios";
import {ChangeUserRole} from "@/validations/auth.validation";
import {UserResponse} from "@/app/types/type";

type Props = {
    user: UserResponse;
}

export function ChangeUserRoleActionButton({ user }: Props) {
    const router = useRouter();

    const completeAndUnCompleteAction = async () => {
        const changeUserRole : ChangeUserRole = {
            email: user.email,
            role: user.role === Role.User ? Role.Admin : Role.User
        }
        await axios.patch("/api/auth/change-role", {...changeUserRole})
        router.push("/users");

    }

    return (
        <Button variant="success" type="button" size="sm" className="m-2" onClick={completeAndUnCompleteAction}>
                {user.role === Role.User ? "User" : "Admin"}
        </Button>
    );
}