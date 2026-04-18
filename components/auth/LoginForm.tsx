'use client'

import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import z from "zod"
import { loginSchema } from "@/lib/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const LoginSubmit = async(values: z.infer<typeof loginSchema>) => {
        console.log(values)
    }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(LoginSubmit)}>
        <FieldGroup className="space-y-4">
            {/* Error Message */}
                    {error && (
                        <div className="p-3 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-md">
                            {error}
                        </div>
                    )}

                    {/* Email */}
                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input
                            type="email"
                            {...register("email")}
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </Field>

                    {/* Password */}
                    <Field>
                        <FieldLabel>Password</FieldLabel>
                        <Input
                            type="password"
                            {...register("password")}
                            placeholder="******"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                        )}
                    </Field>

                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
        </FieldGroup>
      </form>
    </div>
  )
}
