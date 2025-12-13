import {Ticket} from "@prisma/client";
import {getCustomerById, getCustomerByTicket} from "@/app/actions/customer.action";
import {CustomError} from "@/utils/customError.util";
import {TableCell} from "@/components/ui/table";

type Props = {
    ticket: Ticket
}

export async function CustomerName({ ticket }: Props) {
    console.log("At point, in customer-name, ticket : ", ticket);
    //----> Fetch the customer attached to this ticket.
    const response = await getCustomerByTicket(ticket);


    //----> Check for error.
    if (response instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{response?.message}</h1></div>
    }

    return (
        <TableCell className="text-right">{response.name}</TableCell>
    );

}