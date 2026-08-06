import PageContainer from "@/components/layout/PageContainer"
import ExpenseStats from "@/components/dashboard/ExpenseStats"
import RecentExpenses from "@/components/dashboard/RecentExpenses"


export default function Home() {
  return (
    <PageContainer>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 text-muted-foreground">
            Track your spending, review expenses, and monitor analytics.
          </p>
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