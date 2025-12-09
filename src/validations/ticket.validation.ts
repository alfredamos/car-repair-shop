import {z} from "zod";

export const ticketSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, { message: "Title cannot be empty." }),
    notes: z.string().min(1, { message: "Notes cannot be empty." }),
    completed: z.boolean().optional(),
    tech: z.string().min(1, { message: "Tech cannot be empty." }),
    customerId: z.string().min(1, { message: "CustomerId cannot be empty." }),
    
})

export type Ticket = z.infer<typeof ticketSchema>;