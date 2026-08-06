<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ExpenseController;
use App\Http\Controllers\Api\SummaryController;



Route::prefix('expenses')
    ->group(function(){

        Route::get('/',[ExpenseController::class,'index']);
        Route::post('/',[ExpenseController::class,'store']);
        Route::get('/{id}',[ExpenseController::class,'show']);
        Route::put('/{id}',[ExpenseController::class,'update']);
        Route::delete('/{id}',[ExpenseController::class,'destroy']);
    });

Route::get('/summary',[SummaryController::class,'index']
);
