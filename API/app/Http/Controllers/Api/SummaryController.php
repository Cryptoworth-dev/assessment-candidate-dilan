<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\SummaryService;

class SummaryController extends Controller
{

    public function __construct(
        private SummaryService $service
    )
    {
    }

    public function index()
    {
        return response()->json([

            'success'=>true,
            'data'=>$this->service->getSummary()
        ]);

    }


}
