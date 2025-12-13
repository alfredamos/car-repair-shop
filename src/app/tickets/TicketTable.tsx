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
import {CompleteActionButton} from "@/app/tickets/job-completed/CompleteActionButton";
import {DeleteTicketButton} from "@/app/tickets/DeleteTicketButton";

type Props = {
    tickets: Ticket[];
}

export default function TicketTable({ tickets}: Props) {
    //----> Check for empty array of tickets.
    if (tickets?.length === 0) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">There are no tickets to display at this time!</h1></div>
    }

    return (
        <div className="mt-10 max-w-sm md:max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
                <span>Add New Ticket</span>
                <Button asChild size="lg" className="font-bold">
                    <Link href="/tickets/add">Add</Link>
                </Button>
            </div>
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
                                    <Link href={`/tickets/${ticket.id}/detail`}>Detail</Link>
                                </Button>

                                <Button variant="back" type="button" size="sm" className="m-2">
                                    <Link href={`/tickets/${ticket.id}/edit`}>Edit</Link>
                                </Button>
                                <DeleteTicketButton identifier="Admin" tech={ticket.tech} title={ticket.title} path={`/api/tickets/${ticket.id}`}/>
                                <CompleteActionButton identifier="Admin" ticket={ticket}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}