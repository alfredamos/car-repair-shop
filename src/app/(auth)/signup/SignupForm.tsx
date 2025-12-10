"use client"

import {redirect} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {InputWithLabel} from "@/components/form-elements/InputWithLabel";
import {Button} from "@/components/ui/button";
import {Gender} from "@prisma/client";
import {SignupUser, signupUserSchema} from "@/validations/auth.validation";
import {signupUser} from "@/app/actions/auth.action";
import {SelectWithLabel} from "@/components/form-elements/SelectWithLabel";

export default function SignupForm() {
    async function onSubmit(values: SignupUser) {
        console.log("Form submitted with values:", values);
        await signupUser(values);
        redirect("/")
    }

    const defaultValues: SignupUser = {
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        phone: "",
        image: "",
        gender: Gender.Male,

    }

    const form = useForm<SignupUser>({
        resolver: zodResolver(signupUserSchema),
        mode:"onBlur",
        defaultValues,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-100 dark:text-black dark:bg-black text-slate-800 max-w-sm items-center mx-auto rounded-xl shadow-2xl p-10 mt-10">
                <h4 className="font-bold text-slate-800 text-center text-2xl mb-2 dark:text-white">
                    Register Form
                </h4>
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex flex-col">
                        <InputWithLabel<SignupUser> fieldTitle="Name" type="text" nameInSchema="name" className="mb-2 dark:text-white"/>
                        <InputWithLabel<SignupUser> fieldTitle="Password" type="password" nameInSchema="password" className="mb-2 dark:text-white" />
                        <InputWithLabel<SignupUser> fieldTitle="Phone" type="password" nameInSchema="phone" className="mb-2 dark:text-white" />
                    </div>

                    <div className="flex flex-col">
                        <InputWithLabel<SignupUser> fieldTitle="Email" type="email" nameInSchema="email" className="mb-2 dark:text-white" />
                        <InputWithLabel<SignupUser> fieldTitle="Confirm Password" type="password" nameInSchema="confirmPassword" className="mb-2 dark:text-white" />
                        <InputWithLabel<SignupUser> fieldTitle="Image" type="text" nameInSchema="image" className="mb-2 dark:text-white" />

                    </div>
                    </div>
                <div className="grid grid-cols-1 gap-4 md:colospan-2">
                    <SelectWithLabel<SignupUser> fieldTitle="Gender" nameInSchema="gender" data={[{id: "Male", value: "Male"}, {id: "Female", value: "Female"}]} className="mb-2 w-full dark:text-white"/>
                </div>


                <div className="flex flex-col md:flex-row gap-2 mt-6">
                    <Button type="submit" size="lg" className="flex-1 mb-2" variant="indigo">Save</Button>
                    <Button type="button" size="lg" className="flex-1 mb-4" variant="rose" onClick={() => form.reset(defaultValues)}>Reset</Button>
                </div>

            </form>
        </Form>
    )
}