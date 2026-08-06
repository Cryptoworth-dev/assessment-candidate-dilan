<?php

namespace App\Repositories;


use App\Models\Expense;
use App\Repositories\Contracts\ExpenseRepositoryInterface;



class ExpenseRepository implements ExpenseRepositoryInterface
{


    public function all()
    {
        return Expense::latest('expense_date')->get();
    }


    public function find(int $id): ?Expense
    {
        return Expense::find($id);
    }


    public function create(array $data): Expense
    {
        return Expense::create($data);
    }


    public function update(int $id,array $data): Expense
    {
        $expense = Expense::findOrFail($id);
        $expense->update($data);
        return $expense->refresh();
    }

    
    public function delete(int $id): bool
    {
        $expense = Expense::findOrFail($id);
        return $expense->delete();
    }


}
