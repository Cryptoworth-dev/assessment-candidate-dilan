"use client"

import { useState, type ReactNode } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { expenseSchema, ExpenseFormValues } from "@/src/validations/expense"
import { addExpense } from "@/src/services/expenseService"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Plus, Coffee, Car, ShoppingCart, Laptop, Tag, LucideIcon } from "lucide-react"

interface AddExpenseModalProps {
  onExpenseAdded?: (newExpense: ExpenseItem) => void
  trigger?: ReactNode
}

const getCategoryIcon = (category: string): LucideIcon => {
  switch (category.toLowerCase()) {
    case "food & dining": return Coffee
    case "transportation": return Car
    case "groceries": return ShoppingCart
    case "electronics": return Laptop
    default: return Tag
  }
}
export interface ExpenseItem {
  id: string
  description: string
  category: string
  date: string
  amount: string
  icon: LucideIcon
}

export default function AddExpenseModal({ onExpenseAdded, trigger }: AddExpenseModalProps) {
  const [open, setOpen] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

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
      // Call Laravel API
      await addExpense(data)

      // Format for local UI state update
      const formattedExpense: ExpenseItem = {
          //id: Math.random().toString(36.substring(2, 9)),
          description: data.description,
          category: data.category,
          date: data.expense_date,
          amount: `-LKR${Number(data.amount).toFixed(2)}`,
          icon: getCategoryIcon(data.category),
          id: ""
      }

      onExpenseAdded?.(formattedExpense)
      reset()
      setOpen(false)
    } catch (error: any) {
      setServerError(error.message || "An unexpected error occurred.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <DialogTrigger>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger>
          <Button className="gap-2 rounded-xl">
            <Plus className="w-4 h-4" />
            Add Expense
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Expense</DialogTitle>
          <DialogDescription>
            Record a new transaction to your Laravel backend.
          </DialogDescription>
        </DialogHeader>

        {serverError && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input 
              id="description" 
              placeholder="e.g. Client Dinner" 
              {...register("description")} 
            />
            {errors.description && (
              <p className="text-xs text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">LKR</span>
              <Input 
                id="amount" 
                type="number" 
                step="0.01" 
                placeholder="0.00" 
                className="pl-12"
                {...register("amount")} 
              />
            </div>
            {errors.amount && (
              <p className="text-xs text-red-500">{errors.amount.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value: string | null) => {
              if (value) setValue("category", value, { shouldValidate: true })
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                <SelectItem value="Transportation">Transportation</SelectItem>
                <SelectItem value="Groceries">Groceries</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-xs text-red-500">{errors.category.message}</p>
            )}
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="expense_date">Date</Label>
            <Input 
              id="expense_date" 
              type="date" 
              {...register("expense_date")} 
            />
            {errors.expense_date && (
              <p className="text-xs text-red-500">{errors.expense_date.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Expense"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}