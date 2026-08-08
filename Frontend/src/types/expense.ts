export type ExpenseQueryParams = {
  page?: number
  pageSize?: number
  search?: string
  category?: string
  sortBy?: string
  sortOrder?: string
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