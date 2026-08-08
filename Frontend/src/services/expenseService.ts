import { ExpenseFormValues } from "@/src/validations/expense"
import type {
  ExpenseQueryParams,
  SummaryResponse,
  MonthlySpendingResponse,
} from "@/src/types/expense"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

function getToken() {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'))
  return match ? match[2] : null
}

//add expenses
export async function addExpense(data: ExpenseFormValues) {
  const response = await fetch(`${API_URL}/expenses/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
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


//get expenses
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
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch expenses")
  }

  return response.json()
}

//delete expense
export async function deleteExpense(id: string) {
  const response = await fetch(`${API_URL}/expenses/${id}`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Failed to delete expense" }))
    throw new Error(errorData.message || "Failed to delete expense")
  }

  return response.json()
}

//update expense
export async function updateExpense(id: string, data: Partial<ExpenseFormValues>) {
  const response = await fetch(`${API_URL}/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Failed to update expense" }))
    throw new Error(errorData.message || "Failed to update expense")
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



//get summary
export async function getSummary(): Promise<SummaryResponse> {
  const response = await fetch(`${API_URL}/summary`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch summary")
  }

  return response.json() as Promise<SummaryResponse>
}

function extractFilename(disposition: string | null) {
  if (!disposition) return null
  const match = /filename\*=UTF-8''([^;\n]+)/i.exec(disposition) || /filename="?([^";\n]+)"?/i.exec(disposition)
  return match ? decodeURIComponent(match[1]) : null
}

//export expenses
export async function exportExpenses(params: ExpenseQueryParams = {}) {
  const query = new URLSearchParams()

  if (params.page !== undefined) query.set("page", String(params.page))
  if (params.pageSize !== undefined) query.set("pageSize", String(params.pageSize))
  if (params.search) query.set("search", params.search)
  if (params.category) query.set("category", params.category)
  if (params.sortBy) query.set("sortBy", params.sortBy)
  if (params.sortOrder) query.set("sortOrder", params.sortOrder)

  const url = `${API_URL}/expenses/export?${query.toString()}`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "text/csv, application/octet-stream",
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    },
  })

  if (!response.ok) {
    throw new Error("Failed to export expenses")
  }

  const blob = await response.blob()
  const filename = extractFilename(response.headers.get("content-disposition")) || "expenses.csv"

  return { blob, filename }
}

//get monthly spending
export async function getMonthlySpending() {
  const response = await fetch(`${API_URL}/summary/monthly-spending`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
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

// export type MonthlySpendingResponse = {
//   success: boolean
//   data: {
//     year: number
//     monthly_spending: MonthlySpendingItem[]
//   }
// }