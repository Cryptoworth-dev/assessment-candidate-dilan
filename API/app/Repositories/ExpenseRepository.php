<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
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
            $query->where('description', 'like', '%' . $request->search . '%');
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

        // Sorting
        $sortBy = $request->input('sortBy', 'expense_date');
        $sortOrder = strtolower($request->input('sortOrder', 'desc')) === 'asc' ? 'asc' : 'desc';

        if ($sortBy === 'date') {
            $sortBy = 'expense_date';
        }

        $allowedSortColumns = ['expense_date', 'amount', 'category', 'description'];
        if (!in_array($sortBy, $allowedSortColumns)) {
            $sortBy = 'expense_date';
        }

        // Records per page
        $pageSize = $request->input('pageSize', 10);

        return $query
            ->orderBy($sortBy, $sortOrder)
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

    public function getMonthlySpending()
    {
        $currentYear = Carbon::now()->year;

        return Expense::select(
                DB::raw('MONTH(expense_date) as month'),
                DB::raw('SUM(amount) as total')
            )
            ->whereYear('expense_date', $currentYear)
            ->groupBy(
                DB::raw('MONTH(expense_date)')
            )
            ->orderBy('month')
            ->get();
    }
}
