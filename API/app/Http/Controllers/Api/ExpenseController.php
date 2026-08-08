<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;
use App\Http\Resources\ExpenseResource;
use App\Services\ExpenseService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

use Illuminate\Http\JsonResponse;

class ExpenseController extends Controller
{


    public function __construct(
        private ExpenseService $service
    )
    {
    }
//All
    public function index(Request $request): JsonResponse
    {
        $expenses = $this->service->getExpenses($request);

        return response()->json([
            'success' => true,
            'data' => ExpenseResource::collection($expenses),
            'pagination' => [
                'current_page' => $expenses->currentPage(),
                'last_page' => $expenses->lastPage(),
                'per_page' => $expenses->perPage(),
                'total' => $expenses->total(),
            ]
        ]);
    }
//store
   public function store(
        StoreExpenseRequest $request
    ): JsonResponse
    {
        $data = $request->validated();

        $data['user_id'] = $request->user()->id;

        $expense = $this->service->createExpense($data);

        return response()->json([
            'success' => true,
            'message' => 'Expense created successfully.',
            'data' => new ExpenseResource($expense)
        ], 201);
    }
//show one
    public function show(
        int $id
    ): JsonResponse
    {
        $expense = $this->service->getExpense($id);

        return response()->json([

            'success'=>true,
            'data'=>new ExpenseResource($expense)

        ]);

    }
//update
    public function update(
        UpdateExpenseRequest $request,
        int $id
    ): JsonResponse
    {

        $expense = $this->service->updateExpense($id,$request->validated());

        return response()->json([

            'success'=>true,
            'message'=>'Expense updated successfully.',
            'data'=>new ExpenseResource($expense)

        ]);

    }
//delete
    public function destroy(
        int $id
    ): JsonResponse
    {

        $this->service->deleteExpense($id);

        return response()->json([
            'success'=>true,
            'message'=>'Expense deleted successfully.'

        ]);

    }

    public function export(Request $request): StreamedResponse
    {
        $expenses = $this->service->getExpensesForExport($request);

        $fileName = 'expenses_' . now()->format('Y-m-d_H-i-s') . '.csv';

        return response()->streamDownload(function () use ($expenses) {

            $handle = fopen('php://output', 'w');

            // CSV Header
            fputcsv($handle, [
                'ID',
                'Description',
                'Category',
                'Expense Date',
                'Amount',
                'Payment Method',
            ]);

            // CSV Rows
            foreach ($expenses as $expense) {
                fputcsv($handle, [
                    $expense->id,
                    $expense->description,
                    $expense->category,
                    $expense->expense_date,
                    $expense->amount,
                    $expense->payment_method,
                ]);
            }

            fclose($handle);

        }, $fileName, [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="' . $fileName . '"',
        ]);
    }


}
