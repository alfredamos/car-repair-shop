import {z} from "zod";
import {Gender} from "@prisma/client";


export const customerSchema = z.object({
    id: z.string().optional(),
    active: z.boolean().optional(),
    address: z.string().min(1, { message: "Name cannot be empty." }),
    name: z.string().min(1, { message: "Name cannot be empty." }),
    email: z.string().min(1, { message: "Email cannot be empty." }).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    phone: z.string().min(1, { message: "Phone cannot be empty." }),
    image: z.string().min(1, { message: "Image cannot be empty." }),
    gender: z.enum(Gender),
    dateOfBirth: z.string().min(1, { message: "Date of birth cannot be empty." }),
    userId: z.string().optional(),
    notes: z.string().min(1, { message: "Note cannot be empty." }),
});

export type Customer = z.infer<typeof customerSchema>
