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
import {Ticket} from "@prisma/client";
import {CustomerName} from "@/app/tickets/CustomerName";
import TicketNoteContent from "@/app/tickets/TicketNoteContent";

type Props = {
    tickets: Ticket[];
}

export default function TicketsByEmailTable({ tickets }: Props) {
    return (
        <div className="mt-10 max-w-sm md:max-w-2xl mx-auto">
        <Table className="mt-5">
            <TableCaption>A list of Car-repair-shop tickets.</TableCaption>
    <TableHeader>
    <TableRow>
        <TableHead>Title</TableHead>
    <TableHead>Notes</TableHead>
    <TableHead className="text-right">Completed</TableHead>
        <TableHead className="text-right">Assignee</TableHead>
        <TableHead className="text-right">Customer</TableHead>
        <TableHead>Actions</TableHead>
        </TableRow>
        </TableHeader>
        <TableBody>
        {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                <TableCell>{ticket.title}</TableCell>

                <TableCell><TicketNoteContent content={ticket.notes}/></TableCell>
    <TableCell className="text-right">{ticket.completed ? "Yes" : "Not yet"}</TableCell>
        <TableCell className="text-right">{ticket.tech}</TableCell>
        <CustomerName ticket={ticket}/>
    <TableCell className="w-1/3">
    <Button variant="indigo" type="button" size="sm" className="m-2">
    <Link href={`/customers/${ticket.id}/detail`}>Detail</Link>
    </Button>
    <Button variant="rose" type="button" size="sm" className="m-2">
    <Link href={`/customers/${ticket.id}/delete`}>Delete</Link>
    </Button>
    </TableCell>
    </TableRow>
))}
    </TableBody>
    </Table>
    </div>
)
}