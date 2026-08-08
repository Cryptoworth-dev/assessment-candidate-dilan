<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ExpenseController;
use App\Http\Controllers\Api\SummaryController;
use App\Http\Controllers\Api\AuthController;

Route::middleware('auth:sanctum')->group(function () {

    Route::prefix('expenses')->group(function () {
        Route::get('/', [ExpenseController::class, 'index']);
        Route::get('/export', [ExpenseController::class, 'export']);
        Route::post('/add', [ExpenseController::class, 'store']);
        Route::get('/{id}', [ExpenseController::class, 'show']);
        Route::put('/{id}', [ExpenseController::class, 'update']);
        Route::delete('/{id}', [ExpenseController::class, 'destroy']);
    });

    Route::get('/summary', [SummaryController::class, 'index']);
    Route::get('/summary/monthly-spending', [SummaryController::class, 'monthlySpending']);
});


//register
Route::post('/register', [AuthController::class, 'register']);

//login
Route::post('/login', [AuthController::class, 'login']);
