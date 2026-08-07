<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;
use App\Http\Resources\ExpenseResource;
use App\Services\ExpenseService;
use Illuminate\Http\Request;

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

        $expense = $this->service->createExpense($request->validated());
        return response()->json([

            'success'=>true,
            'message'=>'Expense created successfully.',
            'data'=>new ExpenseResource($expense)
        ],201);

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


}
