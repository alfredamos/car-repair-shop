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

type Props = {
    users: UserResponse[]
}

export default function UserTable({ users }: Props) {
    return (
        <div className="mt-10 max-w-sm md:max-w-2xl mx-auto">
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
                                />
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="text-right">{user.phone}</TableCell>
                            <TableCell className="text-right">{user.role}</TableCell>
                            <TableCell className="text-right">{user.gender}</TableCell>
                            <TableCell className="w-1/3">
                                <Button variant="indigo" type="button" size="sm" className="m-2">
                                    <Link href={`/customers/${user.id}/detail`}>Detail</Link>
                                </Button>
                                <Button variant="rose" type="button" size="sm" className="m-2">
                                    <Link href={`/customers/${user.id}/delete`}>Delete</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}