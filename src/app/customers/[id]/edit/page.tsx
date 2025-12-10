import {getCustomerById} from "@/app/actions/customer.action";
import {CustomError} from "@/utils/customError.util";
import {CustomerForm} from "@/app/customers/CustomerForm";
import {initialCustomer} from "@/app/customers/initialCustomer";

export default async function EditCustomerPage({params}:{params: Promise<{id: string}>}) {
    //----> Get the customer id from params.
    const {id} = await params;

    //----> Fetch the customer.
    const response = await getCustomerById(id);

    //----> Check for error.
    if (response instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{response?.message}</h1></div>
    }

    console.log("In edit-customer-page, customer : ", response);

    const initializer = initialCustomer(response);

    return (
        <CustomerForm
            defaultValues={initializer}
            formLabel="Edit"
            id={id}
        />
    );
}