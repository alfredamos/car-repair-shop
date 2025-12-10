"use client"

import {useFormContext} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Checkbox} from "@/components/ui/checkbox";

type Props<T> = {
    fieldTitle: string;
    nameInSchema: keyof T & string;
    message: string;
}

export function CheckboxWithLabel<T>({fieldTitle, nameInSchema, message}: Props<T>) {
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-2 dark:text-white w-full mt-2">
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    {message}
                    <div className="space-y-1 leading-none">
                        <FormLabel className="dark:text-white">
                            {fieldTitle}
                        </FormLabel>
                        <FormMessage />
                    </div>
                </FormItem>
            )}
        />


    );
}