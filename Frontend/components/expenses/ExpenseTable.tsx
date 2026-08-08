"use client"

import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ExpenseFormValues, expenseSchema } from "@/src/validations/expense"
import { updateExpense } from "@/src/services/expenseService"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit3, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ExpenseRow {
  id: string
  description: string
  category: string
  expense_date: string
  amount: number | string
}

interface ExpenseTableProps {
  expenses: ExpenseRow[]
  isLoading: boolean
  deleteLoading: boolean
  onDelete: (id: string) => Promise<void>
  onPrevious: () => void
  onNext: () => void
  canPrevious: boolean
  canNext: boolean
}

export default function ExpenseTable({ expenses, isLoading, deleteLoading, onDelete, onPrevious, onNext, canPrevious, canNext }: ExpenseTableProps) {
  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(null)
  const [editingExpense, setEditingExpense] = useState<ExpenseRow | null>(null)

  const queryClient = useQueryClient()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: "",
      amount: "",
      category: "",
      expense_date: "",
    },
  })

  useEffect(() => {
    if (editingExpense) {
      reset({
        description: editingExpense.description,
        amount: String(editingExpense.amount),
        category: editingExpense.category,
        expense_date: editingExpense.expense_date,
      })
    }
  }, [editingExpense, reset])

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ExpenseFormValues> }) => updateExpense(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] })
    },
  })

  const handleUpdateSubmit = async (data: ExpenseFormValues) => {
    if (!editingExpense) return
    await updateMutation.mutateAsync({
      id: editingExpense.id,
      data: {
        description: data.description,
        amount: Number(data.amount),
        expense_date: data.expense_date,
      },
    })
    setEditingExpense(null)
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="text-muted-foreground text-xs uppercase">
              <TableHead className="w-[15%]">Date</TableHead>
              <TableHead className="w-[35%]">Description</TableHead>
              <TableHead className="w-[20%]">Category</TableHead>
              <TableHead className="w-[15%] text-right">Amount</TableHead>
              <TableHead className="w-[15%] text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  Loading expenses...
                </TableCell>
              </TableRow>
            ) : expenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  No expenses found.
                </TableCell>
              </TableRow>
            ) : (
              expenses.map((expense) => (
                <TableRow key={expense.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{expense.expense_date}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal rounded-md">
                      {expense.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">LKR {Number(expense.amount).toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        className="text-green-600 hover:text-green-700"
                        onClick={() => setEditingExpense(expense)}
                      >
                        <Edit3 />
                      </Button>
                      <Dialog open={selectedExpenseId === expense.id} onOpenChange={(open) => setSelectedExpenseId(open ? expense.id : null)}>
                        <DialogTrigger render={<Button variant="outline" size="icon-sm" className="text-red-600 hover:text-red-700"><Trash2 /></Button>} />
                        <DialogContent className="rounded-2xl">
                          <DialogHeader>
                            <DialogTitle>Confirm deletion</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this expense? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="gap-2">
                            <Button variant="outline" onClick={() => setSelectedExpenseId(null)}>
                              Cancel
                            </Button>
                            <Button
                              type="button"
                              disabled={deleteLoading}
                              onClick={async () => {
                                if (!expense.id) return
                                await onDelete(expense.id)
                                setSelectedExpenseId(null)
                              }}
                            >
                              {deleteLoading ? "Deleting..." : "Delete"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={Boolean(editingExpense)} onOpenChange={(open) => { if (!open) setEditingExpense(null) }}>
        <DialogContent className="rounded-2xl max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Expense</DialogTitle>
            <DialogDescription>
              Update the description, amount, or date for this expense entry.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleUpdateSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit_description">Description</Label>
              <Input id="edit_description" {...register("description") } />
              {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit_amount">Amount</Label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  LKR
                </span>
                <Input id="edit_amount" type="number" step="0.01" className="pl-12" {...register("amount")} />
              </div>
              {errors.amount && <p className="text-xs text-red-500">{errors.amount.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit_expense_date">Date</Label>
              <Input id="edit_expense_date" type="date" {...register("expense_date")} />
              {errors.expense_date && <p className="text-xs text-red-500">{errors.expense_date.message}</p>}
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" type="button" onClick={() => setEditingExpense(null)}>
                Cancel
              </Button>
              <Button type="submit" disabled={updateMutation.isLoading}>
                {updateMutation.isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {expenses.length} record{expenses.length === 1 ? "" : "s"}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onPrevious} disabled={!canPrevious}>
            Previous
          </Button>
          <Button variant="outline" onClick={onNext} disabled={!canNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
