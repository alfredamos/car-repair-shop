import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {UserResponse} from "@/app/types/type";
import {DeleteUserButton} from "@/app/users/DeleteUserButton";
import {ChangeUserRoleActionButton} from "@/app/users/ChangeUserRoleActionButton";

type Props = {
    users: UserResponse[]
}

export default function UserTable({ users }: Props) {
    //----> Check for empty array of users.
    if (users?.length === 0) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">There are no users to display at this time!</h1></div>
    }

    return (
        <div className="mt-10 max-w-sm md:max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
                <span>Add New User</span>
                <Button asChild size="lg" className="font-bold">
                    <Link href="/signup">Add</Link>
                </Button>
            </div>
            <Table className="mt-5">
                <TableCaption>A list of Car-repair-shop users.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Phone</TableHead>
                        <TableHead className="text-right">Role</TableHead>
                        <TableHead className="text-right">Gender</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">
                                <img
                                    src={user.image}
                                    height={80}
                                    width={80}
                                    alt={user.name}
                                />
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="text-right">{user.phone}</TableCell>
                            <TableCell className="text-right">{user.role}</TableCell>
                            <TableCell className="text-right">{user.gender}</TableCell>
                            <TableCell className="w-1/3">
                                <Button variant="indigo" type="button" size="sm" className="m-2">
                                    <Link href={`/users/${user.id}/detail`}>Detail</Link>
                                </Button>
                                <DeleteUserButton name={user.name} path={`/users/${user.id}/delete`}/>
                                <ChangeUserRoleActionButton user={user}/>
                                <Button variant="back" type="button" size="sm" className="m-2">
                                    <Link href={`/tickets/get-tickets-by-email/${encodeURIComponent(user.email)}`}>Tickets</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}