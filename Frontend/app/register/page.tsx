"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterFormValues } from "@/src/validations/auth"
import { registerUser } from "@/src/services/authService"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", password_confirmation: "" },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setServerError(null)
      const res = await registerUser(data)
      if (res?.message) {
        // maybe show a toast
      }
      router.push("/")
    } catch (err: any) {
      setServerError(err.message || "Registration failed")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      {serverError && <div className="mb-3 text-sm text-red-600">{serverError}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
        </div>

        <div>
          <Label htmlFor="password_confirmation">Confirm Password</Label>
          <Input id="password_confirmation" type="password" {...register("password_confirmation")} />
          {errors.password_confirmation && <p className="text-xs text-red-500">{errors.password_confirmation.message}</p>}
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              // Prefill with test data and submit
              setValue("name", "Dilan", { shouldValidate: true })
              setValue("email", "dilan@example.com", { shouldValidate: true })
              setValue("password", "password123", { shouldValidate: true })
              setValue("password_confirmation", "password123", { shouldValidate: true })
              // submit programmatically
              void handleSubmit(async (data) => await onSubmit(data))()
            }}
            className="flex-1"
          >
            Test REGISTER
          </Button>
        </div>
      </form>
    </div>
  )
}
