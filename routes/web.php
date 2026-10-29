<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => redirect()->route('dashboard'));

// Semua user yang sudah login (admin & user)
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    // READ saja
    Route::get('/books', [BookController::class, 'index'])->name('books.index');
    Route::get('/members', [MemberController::class, 'index'])->name('members.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Khusus admin: Create, Update, Delete
Route::middleware(['auth', RoleMiddleware::class . ':admin'])->group(function () {
    Route::resource('books', BookController::class)->except(['index', 'show']);
    Route::resource('members', MemberController::class)->except(['index', 'show']);
});

require __DIR__ . '/auth.php';
