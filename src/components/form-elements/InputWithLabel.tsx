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
                            className={`w-full max-w-xs ${className}`}
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