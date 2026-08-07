import { Plus } from "lucide-react"
import PageContainer from "@/components/layout/PageContainer"
import ExpenseStats from "@/components/dashboard/ExpenseStats"
import RecentExpenses from "@/components/dashboard/RecentExpenses"
import AddExpenseModal from "@/components/dashboard/AddExpenseModal"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <PageContainer>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Dashboard
            </h1>

            <p className="mt-2 text-muted-foreground">
              Track your spending, review expenses, and monitor analytics.
            </p>
          </div>

          <AddExpenseModal
            trigger={
              <Button className="gap-2 rounded-xl">
                <Plus className="h-4 w-4" />
                Add Expense
              </Button>
            }
          />
        </div>
        <div className="mt-8">
          <ExpenseStats />
        </div>
        {/*Table Section */}
        <div className="mt-15">
          <RecentExpenses />
        </div>
      </section>
    </PageContainer>
  )
}