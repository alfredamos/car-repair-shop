import {Customer} from "@prisma/client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {formattedDate} from "@/utils/formattedDate";
import {Button} from "@/components/ui/button";
import Link from "next/link";

type Props = {
    customers: Customer[]
}

export default function CustomerTable({ customers }: Props) {
    return (
        <div className="mt-10">
        <Table className="mt-5">
            <TableCaption>A list of Car-repair-shop customers.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Phone</TableHead>
                    <TableHead className="text-right">Address</TableHead>
                    <TableHead className="text-right">Gender</TableHead>
                    <TableHead className="text-right">Birthdate</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {customers.map((customer) => (
                    <TableRow key={customer.id}>
                        <TableCell className="font-medium">
                            <img
                                src={customer.image}
                                height={80}
                                width={80}
                            />
                            </TableCell>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell className="text-right">{customer.phone}</TableCell>
                        <TableCell className="text-right">{customer.address}</TableCell>
                        <TableCell className="text-right">{customer.gender}</TableCell>
                        <TableCell className="text-right">{formattedDate(customer.dateOfBirth)}</TableCell>
                        <TableCell className="w-1/3">
                            <Button variant="indigo" type="button" size="sm" className="m-2">
                                <Link href={`/customers/${customer.id}/detail`}>Detail</Link>
                            </Button>
                            <Button variant="back" type="button" size="sm" className="m-2">
                                <Link href={`/customers/${customer.id}/edit`}>Edit</Link>
                            </Button>
                            <Button variant="rose" type="button" size="sm" className="m-2">
                                <Link href={`/customers/${customer.id}/delete`}>Delete</Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </div>
    )
}