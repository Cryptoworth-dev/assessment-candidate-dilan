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
//get
export async function getExpenses() {
  const response = await fetch(`${API_URL}/expenses`, {
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

//summery

export async function getSummary() {

  const response = await fetch(`${API_URL}/summary`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
  })


  if (!response.ok) {
    throw new Error("Failed to fetch summary")
  }


  return response.json()
}