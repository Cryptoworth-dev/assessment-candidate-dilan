<?php

namespace App\Repositories;

use Illuminate\Http\Request;
use App\Models\Expense;
use App\Repositories\Contracts\ExpenseRepositoryInterface;



class ExpenseRepository implements ExpenseRepositoryInterface
{

    public function all(Request $request)
    {
        $query = Expense::query();

        // Search
        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        // Category Filter
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        // Payment Method Filter
        if ($request->filled('payment_method')) {
            $query->where('payment_method', $request->payment_method);
        }

        // Date From
        if ($request->filled('from')) {
            $query->whereDate('date', '>=', $request->from);
        }

        // Date To
        if ($request->filled('to')) {
            $query->whereDate('date', '<=', $request->to);
        }

        // Records per page
        $pageSize = $request->input('pageSize', 10);

        return $query
            ->orderBy('expense_date', 'desc')
            ->paginate($pageSize);
    }

    public function getAllExpenses()
    {
        return Expense::all();
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
