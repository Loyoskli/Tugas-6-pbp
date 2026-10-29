<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\MemberController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — CPMK 2 (JWT + Role Based)
|--------------------------------------------------------------------------
| Admin : full CRUD
| User  : Read only
|--------------------------------------------------------------------------
*/

// ---------- PUBLIC ----------
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login',    [AuthController::class, 'login']);
});

// ---------- AUTHENTICATED (Admin & User) ----------
Route::middleware('auth:api')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::get('me',       [AuthController::class, 'me']);
        Route::post('logout',  [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
    });

    Route::get('dashboard', [DashboardController::class, 'index']);

    // READ-ONLY (semua user terautentikasi)
    Route::get('books',           [BookController::class, 'index']);
    Route::get('books/{book}',    [BookController::class, 'show']);
    Route::get('members',         [MemberController::class, 'index']);
    Route::get('members/{member}',[MemberController::class, 'show']);
});

// ---------- ADMIN ONLY (CRUD) ----------
Route::middleware(['auth:api', 'role:admin'])->group(function () {
    Route::post('books',            [BookController::class, 'store']);
    Route::put('books/{book}',      [BookController::class, 'update']);
    Route::delete('books/{book}',   [BookController::class, 'destroy']);

    Route::post('members',          [MemberController::class, 'store']);
    Route::put('members/{member}',  [MemberController::class, 'update']);
    Route::delete('members/{member}', [MemberController::class, 'destroy']);
});
