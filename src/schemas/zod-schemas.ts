import { z } from "zod";

export const loginFormSchema = z.object({
    email: z
        .string({ message: "Email is required" })
        .email({ message: "Email is invalid" }),
    password: z
        .string({ message: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters long" }),
});

export const registerFormSchema = z.object({
    email: z
        .string({ message: "Email is required" })
        .email({ message: "Email is invalid" }),
    password: z
        .string({ message: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters long" }),
});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
export type LoginFormSchema = z.infer<typeof loginFormSchema>;