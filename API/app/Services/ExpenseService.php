<?php

namespace App\Services;


use App\Models\Expense;
use App\Repositories\Contracts\ExpenseRepositoryInterface;



class ExpenseService
{

    public function __construct(
        private ExpenseRepositoryInterface $repository
    ) {}


     //Get all expenses

    public function getExpenses()
    {
        return $this->repository->all();
    }

    //Create new expense

    public function createExpense(array $data): Expense
    {
        return $this->repository->create($data);
    }

     // Find expense

    public function getExpense(int $id): ?Expense
    {
        return $this->repository->find($id);
    }

     //Update expense

    public function updateExpense(int $id,array $data): Expense
    {
        return $this->repository->update(
            $id,
            $data
        );

    }

//Delete expense
    public function deleteExpense(int $id): bool
    {
        return $this->repository->delete($id);
    }

}
