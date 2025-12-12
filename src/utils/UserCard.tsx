import {JSX} from "react";
import {Button} from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {UserResponse} from "@/app/types/type";

type Props = {
    user: UserResponse;
}

export function UserCard({ user }: Props): JSX.Element {
    return (
        <div className="flex flex-col max-w-sm mx-auto my-auto mt-10 ring-2 ring-gray-300 dark:text-gray-400 dark:ring-gray-600 p-2 rounded-t-md mb-10 shadow-xl">
            <div className="flex items-center justify-between m-1">
                <img src={user.image} alt={user.name} className="rounded-full h-20 w-20"/>
                <p>{user.name}</p>
            </div>

            <Separator className="text-gray-600 mt-2"/>
            <div className="w-full">
                <div className="">
                    <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                        <span>Email</span>
                        <span className="text-start">{user.email}</span>
                    </p>
                    <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                        <span>Phone</span>
                        <span className="text-start">{user.phone}</span>
                    </p>
                    <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                        <span>Gender</span>
                        <span className="text-start">{user.gender}</span>
                    </p>
                    <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                        <span>Role</span>
                        <span className="text-start">{user.role}</span>
                    </p>
                </div>
                <Separator className="mt-2"/>
                <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between h-full mb-5 mt-5">
                    <Button variant="indigo" size="sm" className="w-full md:flex-1" asChild>
                        <Link href="/users">Back</Link>
                    </Button>
                    <Button variant="rose" size="sm" className="w-full md:flex-1" asChild>
                        <Link href={`/c/${user.id}/delete`}>Delete</Link>
                    </Button>
                </div>

            </div>
        </div>
    );
}