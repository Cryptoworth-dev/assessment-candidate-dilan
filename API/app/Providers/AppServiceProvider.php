<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Contracts\ExpenseRepositoryInterface;
use App\Repositories\ExpenseRepository;

class AppServiceProvider extends ServiceProvider
{

    public function register(): void
    {
         $this->app->bind(
            
            ExpenseRepositoryInterface::class,
            ExpenseRepository::class

        );
    }


    public function boot(): void
    {
        //
    }
}
