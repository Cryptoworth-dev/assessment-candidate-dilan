<?php

namespace App\Services;
use Carbon\Carbon;

use App\Repositories\Contracts\ExpenseRepositoryInterface;



class SummaryService
{


    public function __construct(
        private ExpenseRepositoryInterface $repository
    ) {}



    public function getSummary(): array
{
    $expenses = $this->repository->getAllExpenses();

    $total = $expenses->sum('amount');

    $categoryTotals = $expenses
        ->groupBy('category')
        ->map(function($items){
            return $items->sum('amount');
        });

    return [
        'total' => $total,
        'categories' => $categoryTotals
    ];
}

public function getMonthlySpending(): array
{
    $monthlyData = $this->repository->getMonthlySpending();


    $months = [
        1 => 'January',
        2 => 'February',
        3 => 'March',
        4 => 'April',
        5 => 'May',
        6 => 'June',
        7 => 'July',
        8 => 'August',
        9 => 'September',
        10 => 'October',
        11 => 'November',
        12 => 'December'
    ];


    $result = [];


    foreach ($months as $number => $name) {

        $expense = $monthlyData
            ->firstWhere('month', $number);


        $result[] = [
            'month' => $name,
            'total' => $expense ? (float)$expense->total : 0
        ];
    }


    return [
        'year' => Carbon::now()->year,
        'monthly_spending' => $result
    ];
}


}
