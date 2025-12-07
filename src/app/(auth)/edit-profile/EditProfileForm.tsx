"use client"

import {editProfileUserSchema, EditUserProfile,} from "@/validations/auth.validation";
import {redirect} from "next/navigation";
import {Gender} from "@prisma/client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {InputWithLabel} from "@/components/form-elements/InputWithLabel";
import {SelectWithLabel} from "@/components/form-elements/SelectWithLabel";
import {Button} from "@/components/ui/button";
import {editUserProfile} from "@/app/actions/auth.action";
import {UserResponse} from "@/app/types/type";

type Props = {
    user: UserResponse;
}

export default function EditProfileForm({user}: Props) {
    async function onSubmit(values: EditUserProfile) {
        console.log("Form submitted with values:", values);
        await editUserProfile(values);
        redirect("/")
    }

    const defaultValues: EditUserProfile = {
        email: user?.email ?? "",
        password: "",
        name: user?.name ?? "",
        phone: user?.phone ?? "",
        image: user?.image ?? "",
        gender: user?.gender ?? Gender.Male,

    }

    const form = useForm<EditUserProfile>({
        resolver: zodResolver(editProfileUserSchema),
        mode:"onBlur",
        defaultValues,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white text-slate-800 max-w-sm items-center mx-auto rounded-xl shadow-2xl p-8 mt-10">
                <h4 className="font-bold text-slate-800 text-center text-2xl mb-6">
                    Edit Profile Form
                </h4>
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex flex-col">
                        <InputWithLabel<EditUserProfile> fieldTitle="Name" type="text" nameInSchema="name" className="mb-2"/>
                        <InputWithLabel<EditUserProfile> fieldTitle="Password" type="password" nameInSchema="password" className="mb-2" />
                        <InputWithLabel<EditUserProfile> fieldTitle="Phone" type="text" nameInSchema="phone" className="mb-2" />
                    </div>

                    <div className="flex flex-col">
                        <InputWithLabel<EditUserProfile> fieldTitle="Email" type="email" nameInSchema="email" className="mb-2" readOnly/>
                        <SelectWithLabel<EditUserProfile> fieldTitle="Gender" nameInSchema="gender" data={[{id: "male", value: "Male"}, {id: "female", value: "Female"}]} className="mb-2 w-full"/>
                        <InputWithLabel<EditUserProfile> fieldTitle="Image" type="text" nameInSchema="image" className="mb-2" />

                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-2 mt-6">
                    <Button type="submit" size="lg" className="flex-1 mb-2" variant="indigo">Save</Button>
                    <Button type="button" size="lg" className="flex-1 mb-4" variant="rose" onClick={() => form.reset(defaultValues)}>Reset</Button>
                </div>

            </form>
        </Form>
    )
}