<?php

namespace App\Repositories\Contracts;
use Illuminate\Http\Request;


use App\Models\Expense;


interface ExpenseRepositoryInterface
{

  //get all expenses
    public function all(Request $request);

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

}
