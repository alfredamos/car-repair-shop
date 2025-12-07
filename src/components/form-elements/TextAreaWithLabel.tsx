"use client"

import {useFormContext} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {TextareaHTMLAttributes} from "react";
import {Textarea} from "@/components/ui/textarea";

type Props<T> = {
    fieldTitle: string;
    nameInSchema: keyof T & string;
    className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaWithLabel<T>({fieldTitle, nameInSchema, className, ...props}: Props<T>) {
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
                        <Textarea
                            id={nameInSchema}
                            className={`mb-2 ${className}`}
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