import EditProfileForm from "@/app/(auth)/edit-profile/EditProfileForm";
import {getCurrentUser} from "@/app/actions/auth.action";
import {CustomError} from "@/utils/customError.util";

export default async function EditUserProfilePage(){
    const response = await getCurrentUser();

    //----> Check for error.
    if (response instanceof CustomError) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg text-black">{response?.message}</h1></div>
    }

    const currentUser = response;

    return (
        <EditProfileForm user={currentUser}/>
    );
}