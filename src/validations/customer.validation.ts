import {z} from "zod";
import {Gender} from "@prisma/client";


export const customerSchema = z.object({
    id: z.string().optional(),
    address: z.string().min(1, { message: "Name cannot be empty." }),
    name: z.string().min(1, { message: "Name cannot be empty." }),
    email: z.string().min(1, { message: "Email cannot be empty." }).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    phone: z.string().min(1, { message: "Phone cannot be empty." }),
    image: z.string().min(1, { message: "Image cannot be empty." }),
    gender: z.enum(Gender),
    dateOfBirth: z.string().optional(),
    userId: z.string().optional(),
});

export type Customer = z.infer<typeof customerSchema>
