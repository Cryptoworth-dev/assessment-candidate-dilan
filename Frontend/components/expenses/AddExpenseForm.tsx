"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { expenseSchema, ExpenseFormValues } from "@/src/validations/expense"
import { addExpense } from "@/src/services/expenseService"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const categories = [
  "Food",
  "Transport",
  "Rent",
  "Shopping",
  "Entertainment",
  "Utilities",
  "Health",
  "Education",
  "Business",
  "Finance",
  "Personal",
  "Other",
]

export default function AddExpenseForm() {
  const [serverError, setServerError] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const today = new Date().toISOString().split("T")[0]

  const mutation = useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] })
    },
  })

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: "",
      amount: "",
      category: "",
      expense_date: "",
    },
  })

  const onSubmit = async (data: ExpenseFormValues) => {
    try {
      setServerError(null)
      await mutation.mutateAsync(data)
      reset()
    } catch (error: any) {
      setServerError(error.message || "An unexpected error occurred.")
    }
  }

  return (
    <Card className="rounded-3xl border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Add New Expense</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {serverError && (
          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="e.g. Client Dinner" {...register("description")} />
            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                LKR
              </span>
              <Input id="amount" type="number" step="0.01" className="pl-12" placeholder="0.00" {...register("amount")} />
            </div>
            {errors.amount && <p className="text-xs text-red-500">{errors.amount.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setValue("category", value, { shouldValidate: true })}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="expense_date">Date</Label>
            <Input id="expense_date" type="date" max={today} {...register("expense_date")} />
            {errors.expense_date && <p className="text-xs text-red-500">{errors.expense_date.message}</p>}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? "Saving..." : "Save Expense"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
