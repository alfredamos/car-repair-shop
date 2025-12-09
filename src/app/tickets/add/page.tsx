import {getAllCustomers} from "@/app/actions/customer.action";
import {getAllUsers} from "@/app/actions/user.action";
import {CustomError} from "@/utils/customError.util";
import {AddTicketForm} from "@/app/tickets/add/AddTicketForm";

export default async function AddTicketPage(){
    //----> Get all customers and users.
    const [customerResponse, userResponse] = await Promise.all([getAllCustomers(), getAllUsers()]);

    //----> Check for error in retrieving customers.
    if (customerResponse instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{customerResponse?.message}</h1></div>
    }

    //----> Check for error in retrieving users.
    if (userResponse instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{userResponse?.message}</h1></div>
    }

    return (
        <AddTicketForm
            customers={customerResponse}
            users={userResponse}
        />
    );
}