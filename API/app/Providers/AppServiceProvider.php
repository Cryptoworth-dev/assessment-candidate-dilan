<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Contracts\ExpenseRepositoryInterface;
use App\Repositories\ExpenseRepository;
use App\Repositories\Contracts\AuthRepositoryInterface;
use App\Repositories\AuthRepository;


class AppServiceProvider extends ServiceProvider
{

    public function register(): void
    {
         $this->app->bind(
            
            ExpenseRepositoryInterface::class,
            ExpenseRepository::class

        );
        
        $this->app->bind(
        AuthRepositoryInterface::class,
        AuthRepository::class
    );
    
    }
    


    public function boot(): void
    {
        //
    }
}
