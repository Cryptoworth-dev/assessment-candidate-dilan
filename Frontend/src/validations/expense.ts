import * as z from "zod"

export const expenseSchema = z.object({
  description: z.string().min(2, "Description must be at least 2 characters."),
  amount: z.string().min(1, "Amount is required").refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a valid positive number",
  }),
  category: z.string().min(1, "Please select a category"),
  expense_date: z.string().min(1, "Date is required"), 
})

export type ExpenseFormValues = z.infer<typeof expenseSchema>