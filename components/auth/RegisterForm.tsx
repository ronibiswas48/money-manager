'use client'

import { useForm } from "react-hook-form";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import z from "zod";
import { registerSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import toast from "react-hot-toast";


// Prop interface
interface RegisterFormProps {
    onSuccess: () => void;
}


export default function RegisterForm(
    {onSuccess}: RegisterFormProps
) {

    const { register, handleSubmit,reset, formState: { errors, isSubmitting } } = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof registerSchema>) => {
        try {
            const response = await fetch('/api/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            })
            if(response.ok) {
                toast.success('Registration successfully!')
                reset();
                onSuccess();
            }else {
                const data = await response.json();
                toast.error(data.message || 'Registration failed');
            }
        } catch (error) {
            toast.error("Something went wrong!");
            console.error(error)
        }
    }
    return (
        <div className="w-full max-w-md">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup className="space-y-4">
                    {/* Full Name */}
                    <Field>
                        <FieldLabel>Full Name</FieldLabel>
                        <Input
                            {...register("name")}
                            placeholder="Enter your full name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </Field>

                    {/* Email */}
                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input
                            type="email"
                            {...register("email")}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </Field>

                    {/* Password */}
                    <Field>
                        <FieldLabel>Password</FieldLabel>
                        <Input
                            type="password"
                            {...register("password")}
                            placeholder="******"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </Field>

                    {/* Confirm Password */}
                    <Field>
                        <FieldLabel>Confirm Password</FieldLabel>
                        <Input
                            type="password"
                            {...register("confirmPassword")}
                            placeholder="******"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    </Field>

                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? "Creating account..." : "Register"}
                    </Button>
                </FieldGroup>
            </form>
        </div>
    )
}
