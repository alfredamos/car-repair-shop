import {getSession} from "@/app/actions/auth.action";

export default async function TicketsByCustomerIdPage(){
    //----> Get user session.
    const {isAdmin} = await getSession();

    //----> Check for admin permission.
    if (!isAdmin) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">You do not have permission to view this page</h1></div>
    }

    return (
        <div>Tickets By CustomerId</div>
    );
}