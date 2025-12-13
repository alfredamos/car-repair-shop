"use client"

import {InputWithLabel} from "@/components/form-elements/InputWithLabel";
import {redirect, useRouter} from "next/navigation";
import {ChangeUserPassword, changeUserPasswordSchema} from "@/validations/auth.validation";
import {changeUserPassword} from "@/app/actions/auth.action";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Props = {
    email: string;
}

export default function ChangePasswordForm({email}: Props) {
    const router = useRouter();
    async function onSubmit(values: ChangeUserPassword) {
        console.log("Form submitted with values:", values);
        await changeUserPassword(values);
        redirect("/")
    }

    const defaultValues: ChangeUserPassword = {
        email: email ?? "",
        password: "",
        newPassword: "",
        confirmPassword: ""
    }

    const form = useForm<ChangeUserPassword>({
        resolver: zodResolver(changeUserPasswordSchema),
        mode:"onBlur",
        defaultValues,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-50 dark:text-black dark:bg-black text-slate-800 max-w-sm items-center mx-auto rounded-xl shadow-2xl py-6 px-10 mt-10">
                <h4 className="font-bold text-slate-800 text-center text-xl mb-2 dark:text-white">
                    Change Password Form
                </h4>
                <Separator className="mt-4 mb-4"/>
                <InputWithLabel<ChangeUserPassword> fieldTitle="Email" type="email" nameInSchema="email" className="mb-2" readOnly/>
                <InputWithLabel<ChangeUserPassword> fieldTitle="Password" type="password" nameInSchema="password" className="mb-2 dark:text-white" />
                <InputWithLabel<ChangeUserPassword> fieldTitle="New Password" type="password" nameInSchema="newPassword" className="mb-2 dark:text-white" />
                <InputWithLabel<ChangeUserPassword> fieldTitle="Confirm Passord" type="password" nameInSchema="confirmPassword" className="mb-2 dark:text-white" />
                <Separator className="mt-4"/>
                <div className="flex flex-col md:flex-row items-center md:justify-between mt-6 gap-2">
                    <Button type="button" size="sm" className="w-full md:w-1/4 mb-4" variant="back" onClick={() => router.back()}>Back</Button>
                    <Button type="submit" size="sm" className="w-full md:w-1/4 mb-4" variant="indigo">Save</Button>
                    <Button type="button" size="sm" className="w-full md:w-1/4 mb-4" variant="rose" onClick={() => form.reset(defaultValues)}>Reset</Button>
                </div>

            </form>
        </Form>
    )
}