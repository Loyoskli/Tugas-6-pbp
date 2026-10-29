<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $books = Book::when($request->q, function ($query, $q) {
                $query->where('title', 'like', "%{$q}%")
                      ->orWhere('author', 'like', "%{$q}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return view('books.index', compact('books'));
    }

    public function create()
    {
        return view('books.create', ['book' => new Book()]);
    }

    public function store(Request $request)
    {
        Book::create($this->validated($request));

        return redirect()->route('books.index')->with('success', 'Buku berhasil ditambahkan.');
    }

    public function edit(Book $book)
    {
        return view('books.edit', compact('book'));
    }

    public function update(Request $request, Book $book)
    {
        $book->update($this->validated($request, $book));

        return redirect()->route('books.index')->with('success', 'Buku berhasil diperbarui.');
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return redirect()->route('books.index')->with('success', 'Buku berhasil dihapus.');
    }

    private function validated(Request $request, ?Book $book = null): array
    {
        return $request->validate([
            'title'     => ['required', 'string', 'max:255'],
            'author'    => ['required', 'string', 'max:255'],
            'publisher' => ['nullable', 'string', 'max:255'],
            'year'      => ['nullable', 'integer', 'between:1000,2100'],
            'isbn'      => ['nullable', 'string', 'max:32', 'unique:books,isbn,' . ($book?->id ?? 'NULL')],
            'category'  => ['nullable', 'string', 'max:100'],
            'stock'     => ['required', 'integer', 'min:0'],
        ]);
    }
}
