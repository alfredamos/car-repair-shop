import {Customer} from "@prisma/client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {formattedDate} from "@/utils/formattedDate";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {DeleteCustomerButton} from "@/app/customers/DeleteCustomerButton";
import {ActiveOrInactiveActionButton} from "@/app/customers/ActiveOrInactiveActionButton";

type Props = {
    customers: Customer[]
}

export default function CustomerTable({ customers }: Props) {
    //----> Check for empty array of customers.
    if (customers?.length === 0) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">There are no customers to display at this time!</h1></div>
    }

    return (
        <div className="mt-10 max-w-sm md:max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
                <span>Add New Customer</span>
                <Button asChild size="lg" className="font-bold">
                    <Link href="/customers/add">Add</Link>
                </Button>
            </div>
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
                        <TableHead className="text-right">Active</TableHead>
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
                                    alt={customer.name}
                                />
                                </TableCell>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell className="text-right">{customer.phone}</TableCell>
                            <TableCell className="text-right">{customer.address}</TableCell>
                            <TableCell className="text-right">{customer.gender}</TableCell>
                            <TableCell className="text-right">{formattedDate(customer.dateOfBirth)}</TableCell>
                            <TableCell className="text-right">{customer.active ? "Active" : "Inactivate"}</TableCell>
                            <TableCell className="w-1/3">
                                <Button variant="indigo" type="button" size="sm" className="m-2">
                                    <Link href={`/customers/${customer.id}/detail`}>Detail</Link>
                                </Button>
                                <Button variant="back" type="button" size="sm" className="m-2">
                                    <Link href={`/customers/${customer.id}/edit`}>Edit</Link>
                                </Button>
                                <DeleteCustomerButton name={customer.name} path={`/customers/${customer.id}/delete`}/>
                                <Button type="button" size="sm" className="m-2">
                                    <Link href={`/customers/get-tickets-by-customer-id/${customer.id}`}>Tickets</Link>
                                </Button>
                                <ActiveOrInactiveActionButton customer={customer}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}