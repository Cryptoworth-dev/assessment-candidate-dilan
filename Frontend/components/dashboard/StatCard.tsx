import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatCardProps {
  title: string
  amount: string
}

export default function StatCard({
  title,
  amount,
}: StatCardProps) {
  return (
    <Card className="rounded-2xl bg-[#004ac6] text-white border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-slate-300">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <h2 className="text-3xl font-bold">
          {amount}
        </h2>
      </CardContent>
    </Card>
  )
}