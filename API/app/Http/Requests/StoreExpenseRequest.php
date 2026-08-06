<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Support\Constants;

class StoreExpenseRequest extends FormRequest
{


    public function authorize(): bool
    {
        return true;
    }



    public function rules(): array
    {
        return [

            'description' => [
                'required',
                'string',
                'max:255'
            ],
            'amount' => [
                'required',
                'numeric',
                'min:0.01'
            ],
            'category' => [
                'required',
                'string',
                Rule::in(Constants::EXPENSE_CATEGORIES),
                'max:100'
            ],
            'expense_date' => [
                'required',
                'date'
            ],

        ];
    }



    public function messages(): array
    {
        return [

            'description.required'
                => 'Expense description is required.',

            'amount.numeric'
                => 'Amount must be a valid number.',

            'amount.min'
                => 'Amount must be greater than zero.',

            'category.required'
                => 'Category is required.',

            'expense_date.required'
                => 'Expense date is required.',

        ];
    }

}
