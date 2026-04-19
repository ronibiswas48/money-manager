import mongoose from "mongoose";
import z from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long!'),
    email: z.string().email('Enter valid email address!'),
    password: z.string().min(6, 'Password must be at least 6 characters long!'),
    confirmPassword: z.string().min(6, 'Confirm password required!')
}).refine(data => data.password === data.confirmPassword, {
    message: "Password doesn't match!",
    path: ['confirmPassword']
})


export const loginSchema = z.object({
    email: z.string().email("Enter valid email address!"),
    password: z.string().min(6, 'Password is required!')
})

// Validation Schema
export const transactionSchema = z.object({
  title: z.string().min(2, "Small title required"),
  amount: z.string().min(1, "Amount required").refine((val) => !isNaN(Number(val)), "Invalid number"),
  category: z.enum(["income", "personal", "medicine", "family", "savings"]),
})


export interface ITransaction {
    userId: mongoose.Types.ObjectId;
    title: string;
    amount: number;
    category: "income" | "personal" | "medicine" | "family" | "savings";
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}