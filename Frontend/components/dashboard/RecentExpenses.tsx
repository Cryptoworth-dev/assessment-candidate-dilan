"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { useQuery } from "@tanstack/react-query"
import { getExpenses } from "@/src/services/expenseService"

export default function RecentExpenses() {

  const {
    data,
    isLoading,
    error
  } = useQuery({

    queryKey: ["expenses"],

    queryFn: getExpenses

  })

  if (isLoading) {
    return (
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          Loading expenses...
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          Failed to load expenses
        </CardContent>
      </Card>
    )
  }

  // Laravel paginate response
  const expenses = data?.data ?? []

  return (
    <Card className="rounded-2xl">

      <CardHeader className="flex flex-col gap-4 pb-4 sm:flex-row sm:items-center sm:justify-between">

        <CardTitle className="text-lg font-semibold">
          Recent Expenses
        </CardTitle>
        <Button
          variant="ghost"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 p-0 h-auto"
        >
          View All →
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="text-muted-foreground text-xs uppercase">
              <TableHead className="w-[35%]">
                Description
              </TableHead>
              <TableHead className="w-[25%]">
                Category
              </TableHead>
              <TableHead className="w-[20%]">
                Date
              </TableHead>
              <TableHead className="w-[20%] text-right">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              expenses.map((expense:any)=>(

                <TableRow
                  key={expense.id}
                  className="hover:bg-muted/50"
                >
                  <TableCell className="font-medium">
                    {expense.description}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="font-normal rounded-md"
                    >
                      {expense.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {expense.expense_date}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    LKR {Number(expense.amount).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))
            }

            {
              expenses.length === 0 && (

                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No expenses found
                  </TableCell>
                </TableRow>
              )
            }

          </TableBody>
        </Table>
      </CardContent>
    </Card>

  )
}