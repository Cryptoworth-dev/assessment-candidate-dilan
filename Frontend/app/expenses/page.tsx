"use client"

import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import PageContainer from "@/components/layout/PageContainer"
import AddExpenseForm from "@/components/expenses/AddExpenseForm"
import ExpenseFilters from "@/components/expenses/ExpenseFilters"
import ExpenseTable from "@/components/expenses/ExpenseTable"
import { getExpenses, deleteExpense, exportExpenses, ExpenseQueryParams } from "@/src/services/expenseService"
import { Button } from "@/components/ui/button"

export default function ExpensesPage() {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")

  const queryClient = useQueryClient()

  const queryParams: ExpenseQueryParams = {
    page,
    pageSize,
    search,
    category,
    sortBy,
    sortOrder,
  }

  const [exportLoading, setExportLoading] = useState(false)

  async function handleExportCsv() {
    try {
      setExportLoading(true)
      const { blob, filename } = await exportExpenses(queryParams)
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename || "expenses.csv"
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Export failed", err)
    } finally {
      setExportLoading(false)
    }
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["expenses", queryParams],
    queryFn: () => getExpenses(queryParams),
    keepPreviousData: true,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] })
    },
  })

  const expenses = data?.data ?? []
  const pagination = data?.pagination

  return (
    <PageContainer>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-3">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Expenses</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your expense history and add new transactions without a popup.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <div>
            <AddExpenseForm />
          </div>

          <div className="space-y-6">
              <div className="rounded-3xl border bg-card p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <ExpenseFilters
                      search={search}
                      category={category}
                      sortBy={sortBy}
                      sortOrder={sortOrder}
                      onSearchChange={(value) => {
                        setSearch(value)
                        setPage(1)
                      }}
                      onCategoryChange={(value) => {
                        setCategory(value)
                        setPage(1)
                      }}
                      onSortByChange={(value) => setSortBy(value)}
                      onSortOrderChange={(value) => setSortOrder(value)}
                    />
                  </div>

                  <div className="flex-shrink-0">
                    <Button onClick={handleExportCsv} className="ml-2" disabled={exportLoading}>
                      {exportLoading ? "Exporting..." : "Export CSV"}
                    </Button>
                  </div>
                </div>
              </div>

            <ExpenseTable
              expenses={expenses}
              isLoading={isLoading}
              onDelete={(id) => deleteMutation.mutateAsync(id)}
              deleteLoading={deleteMutation.isLoading}
              onPrevious={() => setPage((curr) => Math.max(curr - 1, 1))}
              onNext={() => setPage((curr) => (pagination?.current_page ? Math.min(curr + 1, pagination.last_page) : curr + 1))}
              canPrevious={page > 1}
              canNext={Boolean(pagination?.current_page && pagination.current_page < pagination.last_page)}
            />

            {error && (
              <div className="rounded-3xl border bg-red-50 p-4 text-sm text-red-700">
                Failed to load expenses.
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
