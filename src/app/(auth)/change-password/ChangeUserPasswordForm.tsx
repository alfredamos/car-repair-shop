"use client"

import {InputWithLabel} from "@/components/form-elements/InputWithLabel";
import {redirect} from "next/navigation";
import {ChangeUserPassword, changeUserPasswordSchema} from "@/validations/auth.validation";
import {changeUserPassword} from "@/app/actions/auth.action";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";

type Props = {
    email: string;
}

export default function ChangePasswordForm({email}: Props) {

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
            <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white text-slate-800 max-w-sm items-center mx-auto rounded-xl shadow-2xl p-10 mt-10">
                <h4 className="font-bold text-slate-800 text-center text-2xl mb-6">
                    Change Password Form
                </h4>
                <InputWithLabel<ChangeUserPassword> fieldTitle="Email" type="email" nameInSchema="email" className="mb-2" readOnly/>
                <InputWithLabel<ChangeUserPassword> fieldTitle="Password" type="password" nameInSchema="password" className="mb-2" />
                <InputWithLabel<ChangeUserPassword> fieldTitle="New Password" type="password" nameInSchema="newPassword" className="mb-2" />
                <InputWithLabel<ChangeUserPassword> fieldTitle="Confirm Passord" type="password" nameInSchema="confirmPassword" className="mb-2" />
                <div className="flex items-center mt-4">
                    <Button type="submit" size="lg" className="flex-1 mb-4" variant="indigo">Save</Button>
                    <Button type="button" size="lg" className="flex-1 mb-4" variant="rose" onClick={() => form.reset(defaultValues)}>Reset</Button>
                </div>

            </form>
        </Form>
    )
}