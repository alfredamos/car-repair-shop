import {getUserById} from "@/app/actions/user.action";
import {CustomError} from "@/utils/customError.util";
import {UserCard} from "@/utils/UserCard";

export default async function UserDetailPage({params}:{params:Promise<{id:string}>}) {
    //----> Get the id from params.
    const {id} = await params;

    //----> Fetch the user with the given id.
    const response = await getUserById(id);

    //----> Check for error.
    if (response instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{response?.message}</h1></div>
    }

    return (
        <UserCard user={response}/>
    );

}