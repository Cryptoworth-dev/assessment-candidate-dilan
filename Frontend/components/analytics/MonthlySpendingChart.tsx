"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import type { MonthlySpendingItem } from "@/src/services/expenseService"

interface MonthlySpendingChartProps {
  data: MonthlySpendingItem[]
}

export default function MonthlySpendingChart({ data }: MonthlySpendingChartProps) {
  return (
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
  )
}
