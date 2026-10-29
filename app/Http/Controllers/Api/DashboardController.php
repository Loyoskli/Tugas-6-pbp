<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Member;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'totalBooks' => Book::count(),
                'totalStock' => (int) Book::sum('stock'),
                'totalMembers' => Member::count(),
                'totalCats' => Book::whereNotNull('category')->distinct()->count('category'),
                'latestBooks' => Book::latest()->take(5)->get(),
            ],
        ]);
    }
}
