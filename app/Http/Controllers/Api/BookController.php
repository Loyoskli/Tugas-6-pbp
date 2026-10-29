<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * GET /api/books — bisa diakses semua user terautentikasi (admin & user).
     */
    public function index(Request $request): JsonResponse
    {
        $books = Book::query()
            ->when($request->q, function ($query, $q) {
                $query->where('title', 'like', "%{$q}%")
                      ->orWhere('author', 'like', "%{$q}%")
                      ->orWhere('category', 'like', "%{$q}%");
            })
            ->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return response()->json([
            'success' => true,
            'data' => $books->items(),
            'meta' => [
                'current_page' => $books->currentPage(),
                'last_page' => $books->lastPage(),
                'per_page' => $books->perPage(),
                'total' => $books->total(),
            ],
        ]);
    }

    /**
     * GET /api/books/{id} — detail buku.
     */
    public function show(Book $book): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $book,
        ]);
    }

    /**
     * POST /api/books — admin only.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
            'publisher' => ['nullable', 'string', 'max:255'],
            'year' => ['nullable', 'integer', 'between:1000,2100'],
            'isbn' => ['nullable', 'string', 'max:32', 'unique:books,isbn'],
            'category' => ['nullable', 'string', 'max:100'],
            'stock' => ['required', 'integer', 'min:0'],
        ]);

        $book = Book::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Buku berhasil ditambahkan.',
            'data' => $book,
        ], 201);
    }

    /**
     * PUT /api/books/{id} — admin only.
     */
    public function update(Request $request, Book $book): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
            'publisher' => ['nullable', 'string', 'max:255'],
            'year' => ['nullable', 'integer', 'between:1000,2100'],
            'isbn' => ['nullable', 'string', 'max:32', 'unique:books,isbn,' . $book->id],
            'category' => ['nullable', 'string', 'max:100'],
            'stock' => ['required', 'integer', 'min:0'],
        ]);

        $book->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Buku berhasil diperbarui.',
            'data' => $book->fresh(),
        ]);
    }

    /**
     * DELETE /api/books/{id} — admin only.
     */
    public function destroy(Book $book): JsonResponse
    {
        $book->delete();

        return response()->json([
            'success' => true,
            'message' => 'Buku berhasil dihapus.',
        ]);
    }
}
