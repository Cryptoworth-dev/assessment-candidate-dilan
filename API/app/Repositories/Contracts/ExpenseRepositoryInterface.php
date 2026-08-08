<?php

namespace App\Repositories\Contracts;
use Illuminate\Http\Request;


use App\Models\Expense;


interface ExpenseRepositoryInterface
{

  // Get expenses for CSV export
    public function getExpensesForExport(Request $request);
    
  //get all expenses
    public function all(Request $request);

    //get all expenses (unfiltered)
    public function getAllExpenses();

   //find expense by id
    public function find(int $id): ?Expense;

    //create a new expense
    public function create(array $data): Expense;

    //update an existing expense
    public function update(
        int $id,
        array $data
    ): Expense;

    //delete an expense
    public function delete(int $id): bool;
    
    public function getMonthlySpending();

}
