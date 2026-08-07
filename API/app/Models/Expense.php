<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    /** @use HasFactory<\Database\Factories\ExpenseFactory> */
    use HasFactory;

     protected $fillable = [

        'description',

        'amount',

        'category',

        'expense_date'

    ];

    protected $casts = [

        'amount' => 'decimal:2',

        'expense_date' => 'date'

    ];
}
