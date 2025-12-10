import {CustomerForm} from "@/app/customers/CustomerForm";
import {initialCustomer} from "@/app/customers/initialCustomer";

export default async function AddCustomerPage(){
    const initializer = initialCustomer()
    return (
        <CustomerForm
            defaultValues={initializer}
            formLabel="Create"
        />
    );

}