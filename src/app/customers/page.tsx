import {getAllCustomers} from "@/app/actions/customer.action";
import {CustomError} from "@/utils/customError.util";
import CustomerTable from "@/app/customers/CustomerTable";

export default async function AllCustomersPage(){
    //----> Fetch all customers.
    const response = await getAllCustomers();

    //----> Check for error.
    if (response instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{response?.message}</h1></div>
    }

    return (
        <CustomerTable customers={response}/>
    );
}