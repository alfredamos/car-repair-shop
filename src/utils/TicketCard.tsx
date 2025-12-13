import {Button} from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {Customer, Role, Ticket} from "@prisma/client";
import {UserResponse} from "@/app/types/type";
import {Check, X} from "lucide-react";

type Props = {
    ticket: Ticket;
    customer: Customer;
    user: UserResponse;
}

export function TicketCard({ customer, ticket, user }: Props) {
    const isAdmin = user.role === Role.Admin;
    return (
        <div className="flex flex-col max-w-sm mx-auto my-auto mt-10 ring-2 ring-gray-300 dark:text-gray-400 dark:ring-gray-600 p-2 rounded-t-md mb-10 shadow-xl">
            <div className="flex items-center justify-between">
                <div className="flex-col items-center">
                    <p className="text-sm text-start font-bold">Customer</p>
                    <div className="flex flex-col items-center md:flex-row md:justify-between m-1 gap-2">
                        <img src={customer.image} alt={customer.name} className="rounded-full h-10 w-10"/>
                        <p className="text-sm">{customer.name}</p>
                    </div>
                </div>
                <div className="flex-col items-center">
                    <p className="text-sm text-start font-bold">Technician</p>
                    <div className="flex flex-col items-center md:flex-row md:justify-between m-1 gap-2">
                        <img src={user.image} alt={user.name} className="rounded-full h-10 w-10"/>
                        <p className="text-sm">{user.name}</p>
                    </div>
                </div>
            </div>
            <Separator className="text-gray-600 mt-2"/>
            <div className="w-full">
                <div className="">
                    <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                        <span>Title</span>
                        <span className="text-start">{ticket.title}</span>
                    </p>
                    <p className="text-sm mt-2 mb-2 flex items-center justify-between">
                        <span>Completed</span>
                        <span className="text-start">{ticket.completed ? <Check size="25" className="text-green-900 font-bold"/> : <X size="25" className="text-red-900 font-bold"/>}</span>
                    </p>

                    <p className="flex flex-col mt-2 mb-2">
                        <span className="text-sm">Notes</span>
                        <span className="break-words">{ticket.notes}</span>
                    </p>
                </div>
                <Separator className="mt-2"/>
                <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between h-full mb-5 mt-5">
                    <Button variant="indigo" size="lg" className="w-full md:flex-1" asChild>
                        <Link href={`${isAdmin ? "/tickets" : `/tickets/get-tickets-by-email/${user.email}`}`}>Back</Link>
                    </Button>
                    <Button variant="back" size="lg" className="w-full md:flex-1" asChild>
                        <Link href={`/tickets/${customer.id}/edit`}>Edit</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}