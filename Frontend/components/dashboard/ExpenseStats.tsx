"use client"

import StatCard from "./StatCard"
import { useQuery } from "@tanstack/react-query"
import { getSummary } from "@/src/services/expenseService"


// const stats = [
//   {
//     title: "Total Spending",
//     amount: "LKR4,521.00",
//   }
// ]


export default function ExpenseStats() {
   const {
    data,
    isLoading,
    error

  } = useQuery({

    queryKey:["summary"],

    queryFn:getSummary

  })



  if(isLoading){

    return (
      <p>
        Loading summary...
      </p>
    )

  }



  if(error){

    return (
      <p>
        Failed to load summary
      </p>
    )

  }



  const stats = [

    {
      title:"Total Spending",
      amount:`LKR ${Number(data.data.total).toFixed(2)}`
    }

  ]
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