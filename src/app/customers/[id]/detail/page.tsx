import {CustomError} from "@/utils/customError.util";
import {getCustomerById} from "@/app/actions/customer.action";
import {CustomerCard} from "@/utils/CustomerCard";

export default async function CustomerDetailPage({params}: {params: Promise<{id: string}>}){
    //----> Get the id params.
    const {id} = await params;

    //----> Get the ticket with the given id.
    const response = await getCustomerById(id);

    //----> Check for error.
    if (response instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{response?.message}</h1></div>
    }

    return (
        <CustomerCard customer={response} />
    );
}