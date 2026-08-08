"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import type {
  MonthlySpendingItem,
  SummaryResponse,
} from "@/src/services/expenseService"
import { getCategoryColor } from "@/src/constants/colors"

interface MonthlySpendingChartProps {
  data: MonthlySpendingItem[]
  summary: SummaryResponse
}

function CategorySummary({ summary }: { summary: SummaryResponse }) {
  const categoryData = Object.entries(summary.data.categories).map(([name, item]) => ({
    name,
    amount: item.amount,
    percentage: item.percentage,
  }))

  return (
    <div className="space-y-6 rounded-2xl border border-border bg-card p-4 sm:p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Spending by category
        </p>
        <p className="mt-3 text-3xl font-semibold">
          LKR {summary.data.total.toLocaleString()}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="amount"
                nameKey="name"
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={4}
                stroke="transparent"
              >
                {categoryData.map((entry) => (
                  <Cell key={entry.name} fill={getCategoryColor(entry.name)} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`LKR ${value.toLocaleString()}`, "Amount"]}
                contentStyle={{ borderRadius: 12, borderColor: "#e5e7eb" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid gap-3">
          {categoryData.map((entry) => (
            <div
              key={entry.name}
              className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-muted/20 px-3 py-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-3 w-3 rounded-full"
                  style={{ backgroundColor: getCategoryColor(entry.name) }}
                />
                <div>
                  <p className="font-medium">{entry.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {entry.percentage.toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">
                  LKR {entry.amount.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function MonthlySpendingChart({ data, summary }: MonthlySpendingChartProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
      <div className="h-[260px] w-full sm:h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 16, right: 8, left: 0, bottom: 24 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: "#6b7280" }}
              tickLine={false}
              axisLine={false}
              interval={0}
              height={40}
              tickFormatter={(value) => value.slice(0, 3)}
              angle={-30}
              textAnchor="end"
            />
            <YAxis
              tickFormatter={(value) => `LKR ${value}`}
              tick={{ fontSize: 10, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
              width={64}
            />
            <Tooltip
              formatter={(value: number) => [`LKR ${value.toLocaleString()}`, "Spending"]}
              contentStyle={{ borderRadius: 12, borderColor: "#e5e7eb" }}
            />
            <Bar dataKey="total" name="Spending" fill="#1d4ed8" radius={[10, 10, 0, 0]} barSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <CategorySummary summary={summary} />
    </div>
  )
}