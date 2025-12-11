"use client"

import {useFormContext} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Checkbox} from "@/components/ui/checkbox";

type Props<T> = {
    fieldTitle: string;
    nameInSchema: keyof T & string;
    message: string;
}

export function CheckBoxWithLabel<T>({fieldTitle, nameInSchema, message}: Props<T>) {
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem className="flex items-center justify-between dark:text-white w-full gap-2">
                    <FormLabel className="dark:text-white text-base w-1/3 mt-2"
                        htmlFor="{nameInSchema}"
                    >
                        {fieldTitle}
                    </FormLabel>
                    <div className="flex items-center gap-2 mt-2">
                        <FormControl>
                            <Checkbox
                                {...field}
                                id={nameInSchema}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        {message}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />


    );
}