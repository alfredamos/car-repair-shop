import UserTable from "@/app/users/UserTable";
import {getAllUsers} from "@/app/actions/user.action";
import {CustomError} from "@/utils/customError.util";

export default async function AllUsersPage(){
    //----> Fetch all users.
    const response = await getAllUsers();

    //----> Check for error.
    if (response instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{response?.message}</h1></div>
    }

    return (
        <UserTable users={response}/>
    );
}