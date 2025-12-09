"use client"

import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {InputHTMLAttributes} from "react";
import { useFormContext } from 'react-hook-form';
import {Input} from "@/components/ui/input";

type Props<T> = {
    fieldTitle: string;
    nameInSchema: keyof T & string;
    className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputWithLabel<T>({fieldTitle, nameInSchema, className, ...props}: Props<T>) {
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({field}) => (
                <FormItem>
                    <FormLabel
                        className="text-base"
                        htmlFor={nameInSchema}
                    >
                        {fieldTitle}
                    </FormLabel>
                    <FormControl>
                        <Input
                            id={nameInSchema}
                            className={`w-full max-w-xs ring-1 ring-gray-300 dark:ring-1 dark:ring-gray-300 ${className} ${props.readOnly && nameInSchema === "email" ? "dark:text-white" : ""}`}
                            {...props}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />


    );
}