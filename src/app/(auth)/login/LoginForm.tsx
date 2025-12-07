"use client"

import {InputWithLabel} from "@/components/form-elements/InputWithLabel";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {LoginUser, loginUserSchema} from "@/validations/auth.validation";
import {loginUser} from "@/app/actions/auth.action";
import {Button} from "@/components/ui/button";
import {redirect} from "next/navigation";

export default function LoginForm(){

    async function onSubmit(values: LoginUser) {
        console.log("Form submitted with values:", values);
        await loginUser(values);
        redirect("/")
    }

    const defaultValues: LoginUser = {
        email: "",
        password: "",
    }

    const form = useForm<LoginUser>({
        resolver: zodResolver(loginUserSchema),
        defaultValues,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white text-slate-800 max-w-sm items-center mx-auto rounded-xl shadow-2xl p-10 mt-10">
                <h4 className="font-bold text-slate-800 text-center text-2xl mb-6">
                    Change Password Form
                </h4>
                <InputWithLabel<LoginUser> fieldTitle="Email" type="email" nameInSchema="email" className="mb-2"/>
                <InputWithLabel<LoginUser> fieldTitle="Password" type="password" nameInSchema="password" className="mb-2" />
                <div className="flex items-center mt-4">
                    <Button type="submit" size="lg" className="flex-1 mb-4" variant="indigo">Save</Button>
                    <Button type="button" size="lg" className="flex-1 mb-4" variant="rose" onClick={() => form.reset(defaultValues)}>Reset</Button>
                </div>

            </form>
        </Form>
    )
}