import StatCard from "./StatCard"


const stats = [
  {
    title: "Total Spending",
    amount: "LKR4,521.00",
  },
  {
    title: "Transportation",
    amount: "LKR845.50",
  },
  {
    title: "Rent & Utilities",
    amount: "LKR2,100.00",
  },
  {
    title: "Food & Dining",
    amount: "LKR320.00",
  },
]


export default function ExpenseStats() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          amount={stat.amount}
        />
      ))}

    </div>
  )
}