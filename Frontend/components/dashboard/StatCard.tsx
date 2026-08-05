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
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">
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