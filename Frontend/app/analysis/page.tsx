"use client"

import { useQuery } from "@tanstack/react-query"
import MonthlySpendingChart from "@/components/analytics/MonthlySpendingChart"
import { getMonthlySpending, MonthlySpendingItem } from "@/src/services/expenseService"
import PageContainer from "@/components/layout/PageContainer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AnalysisPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["monthlySpending"],
    queryFn: getMonthlySpending,
  })

  if (isLoading) {
    return (
      <PageContainer>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p>Loading monthly spending...</p>
        </div>
      </PageContainer>
    )
  }

  if (error || !data?.success) {
    return (
      <PageContainer>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p>Failed to load monthly spending</p>
        </div>
      </PageContainer>
    )
  }

  const monthlySpending: MonthlySpendingItem[] = data.data.monthly_spending
  return (
    <PageContainer>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Analytics
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Review your monthly spending and trends for the current year.
          </p>
        </div>

        <Card className="rounded-2xl sm:rounded-3xl">
          <CardHeader>
            <CardTitle className="text-base font-semibold sm:text-lg">
              Monthly Spending
            </CardTitle>
          </CardHeader>

          <CardContent className="px-2 py-4 sm:px-6 sm:py-6">
            <MonthlySpendingChart data={monthlySpending} />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
