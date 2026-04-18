import z, { email } from "zod";

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