"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

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
                    <Dialog open={selectedExpenseId === expense.id} onOpenChange={(open) => setSelectedExpenseId(open ? expense.id : null)}>
                      <DialogTrigger render={<Button variant="outline" size="sm">Delete</Button>} />
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
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

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
