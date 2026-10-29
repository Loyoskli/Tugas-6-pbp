<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Member;

class DashboardController extends Controller
{
    public function __invoke()
    {
        return view('dashboard', [
            'totalBooks'   => Book::count(),
            'totalStock'   => (int) Book::sum('stock'),
            'totalMembers' => Member::count(),
            'totalCats'    => Book::whereNotNull('category')->distinct()->count('category'),
            'latestBooks'  => Book::latest()->take(5)->get(),
        ]);
    }
}
