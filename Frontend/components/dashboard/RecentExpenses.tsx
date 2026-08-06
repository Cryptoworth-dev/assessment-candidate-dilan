import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coffee, Car, ShoppingCart, Laptop } from "lucide-react"

const expenses = [
  {
    id: "1",
    description: "Starbucks Coffee",
    category: "Food & Dining",
    date: "Oct 24, 2023",
    amount: "-LKR5.40",
    icon: Coffee,
  },
  {
    id: "2",
    description: "Uber Ride",
    category: "Transportation",
    date: "Oct 23, 2023",
    amount: "-LKR24.50",
    icon: Car,
  },
  {
    id: "3",
    description: "Whole Foods Market",
    category: "Groceries",
    date: "Oct 21, 2023",
    amount: "-LKR142.80",
    icon: ShoppingCart,
  },
  {
    id: "4",
    description: "Apple Store",
    category: "Electronics",
    date: "Oct 20, 2023",
    amount: "-LKR1,299.00",
    icon: Laptop,
  },
]

export default function RecentExpenses() {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold">Recent Expenses</CardTitle>
        <Button variant="ghost" className="text-sm font-medium text-blue-600 hover:text-blue-700 p-0 h-auto">
          View All &rarr;
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="text-muted-foreground text-xs uppercase">
              <TableHead className="w-[30%]">Description</TableHead>
              <TableHead className="w-[25%]">Category</TableHead>
              <TableHead className="w-[20%]">Date</TableHead>
              <TableHead className="w-[15%] text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => {
              const Icon = expense.icon
              return (
                <TableRow key={expense.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium flex items-center gap-3 py-4">
                    <div className="p-2 rounded-lg bg-muted flex items-center justify-center">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    {expense.description}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal rounded-md">
                      {expense.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{expense.date}</TableCell>
                  <TableCell className="text-right font-medium">{expense.amount}</TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}