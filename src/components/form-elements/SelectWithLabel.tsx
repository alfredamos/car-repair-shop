"use client"

import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useFormContext} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

type DataObj = {
    id: string;
    value: string;
}

type Props<T> = {
    fieldTitle: string;
    nameInSchema: keyof T & string;
    data: DataObj[];
    className?: string;
}

export function SelectWithLabel<T>({fieldTitle, data, nameInSchema, className}: Props<T>) {
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem>
                    <FormLabel
                        className="text-base dark:text-white"
                        htmlFor={nameInSchema}
                    >
                        {fieldTitle}
                    </FormLabel>
                    <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger
                                id={nameInSchema}
                                className={`w-full max-w-xs ${className}`}
                            >
                                <SelectValue placeholder="select" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {data.map(item => (
                                <SelectItem
                                    key={`${nameInSchema}_${item.id}`}
                                    value={item.id}
                                >
                                    {item.value} 
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );

}