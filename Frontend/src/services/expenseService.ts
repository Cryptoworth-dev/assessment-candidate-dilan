import { ExpenseFormValues } from "@/src/validations/expense"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export async function addExpense(data: ExpenseFormValues) {
  const response = await fetch(`${API_URL}/expenses/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      description: data.description,
      amount: Number(data.amount),
      category: data.category,
      expense_date: data.expense_date,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Failed to add expense")
  }

  return response.json()
}
export type ExpenseQueryParams = {
  page?: number
  pageSize?: number
  search?: string
  category?: string
  sortBy?: string
  sortOrder?: string
}

export async function getExpenses(params: ExpenseQueryParams = {}) {
  const query = new URLSearchParams()

  if (params.page !== undefined) query.set("page", String(params.page))
  if (params.pageSize !== undefined) query.set("pageSize", String(params.pageSize))
  if (params.search) query.set("search", params.search)
  if (params.category) query.set("category", params.category)
  if (params.sortBy) query.set("sortBy", params.sortBy)
  if (params.sortOrder) query.set("sortOrder", params.sortOrder)

  const response = await fetch(`${API_URL}/expenses?${query.toString()}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch expenses")
  }

  return response.json()
}

export async function deleteExpense(id: string) {
  const response = await fetch(`${API_URL}/expenses/${id}`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
    },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Failed to delete expense" }))
    throw new Error(errorData.message || "Failed to delete expense")
  }

  return response.json()
}



export type CategorySummaryItem = {
  amount: number
  percentage: number
}

export type SummaryData = {
  total: number
  categories: Record<string, CategorySummaryItem>
}

export type SummaryResponse = {
  success: boolean
  data: SummaryData
}

export async function getSummary(): Promise<SummaryResponse> {
  const response = await fetch(`${API_URL}/summary`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch summary")
  }

  return response.json() as Promise<SummaryResponse>
}

export async function getMonthlySpending() {
  const response = await fetch(`${API_URL}/summary/monthly-spending`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch monthly spending")
  }

  return response.json() as Promise<MonthlySpendingResponse>
}

export type MonthlySpendingItem = {
  month: string
  total: number
}

export type MonthlySpendingResponse = {
  success: boolean
  data: {
    year: number
    monthly_spending: MonthlySpendingItem[]
  }
}