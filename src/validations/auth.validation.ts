import {z} from "zod";
import {Gender} from "@prisma/client";

export const changeUserPasswordSchema = z.object({
    email: z.string().min(1, { message: "Email cannot be empty." }).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    password: z.string().min(1, { message: "Password cannot be empty." }),
    newPassword: z.string().min(1, { message: "NewPassword cannot be empty." }),
    confirmPassword: z.string().min(1, { message: "ConfirmPassword cannot be empty." })
}).refine((values) => values.confirmPassword.normalize() === values.newPassword.normalize(),
    {
        message: "Passwords do not match",
        path: ["confirmPassword"], // Associates the error with the confirmPassword field
    });

export type ChangeUserPassword = z.infer<typeof changeUserPasswordSchema>

export const loginUserSchema = z.object({
    email: z.string().min(1, { message: "Email cannot be empty." }).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    password: z.string().min(1, { message: "Password cannot be empty." }),
});

export type LoginUser = z.infer<typeof loginUserSchema>

export const signupUserSchema = z.object({
    name: z.string().min(1, { message: "Name cannot be empty." }),
    email: z.string().min(1, { message: "Email cannot be empty." }).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    phone: z.string().min(1, { message: "Phone cannot be empty." }),
    image: z.string().min(1, { message: "Image cannot be empty." }),
    gender: z.enum(Gender),
    role: z.string().optional(),
    password: z.string().min(1, { message: "Password cannot be empty." }),
    confirmPassword: z.string().min(1, { message: "ConfirmPassword cannot be empty." }),
}).refine((values) => values.password.normalize() === values.confirmPassword.normalize(),
    {
        message: "Passwords do not match",
        path: ["confirmPassword"], // Associates the error with the confirmPassword field
    });

export type SignupUser = z.infer<typeof signupUserSchema>

export const editProfileUserSchema = z.object({
    name: z.string().min(1, { message: "Name cannot be empty." }),
    email: z.string().min(1, { message: "Email cannot be empty." }).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    phone: z.string().min(1, { message: "Phone cannot be empty." }),
    image: z.string().min(1, { message: "Image cannot be empty." }),
    gender: z.enum(Gender),
    password: z.string().min(1, { message: "Password cannot be empty." }),
});

export const changeUserRoleSchema = z.object({
    email: z.string().min(1, { message: "Email cannot be empty." }),
    role: z.enum(['Admin', 'Manager', 'User']),
});

export type ChangeUserRole = z.infer<typeof changeUserRoleSchema>

export type EditUserProfile = z.infer<typeof editProfileUserSchema>