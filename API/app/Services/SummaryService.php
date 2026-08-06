<?php

namespace App\Services;


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


}
