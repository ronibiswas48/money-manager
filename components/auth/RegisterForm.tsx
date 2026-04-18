'use client'

import { useForm } from "react-hook-form";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import z from "zod";
import { registerSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";


export default function RegisterForm() {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof registerSchema>) => {
        console.log(values)
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
