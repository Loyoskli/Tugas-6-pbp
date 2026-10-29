@extends('layouts.library')

@section('title', 'Ubah buku')
@section('heading', 'Ubah buku')

@section('content')
    <form method="POST" action="{{ route('books.update', $book) }}" class="card max-w-2xl overflow-hidden">
        <div class="border-b border-slate-200 bg-uksw-50 px-6 py-4">
            <h2 class="font-bold text-uksw-900">Ubah data buku</h2>
            <p class="text-sm text-slate-500">Perbarui informasi buku, tanda <span class="text-rose-500">*</span> wajib diisi.</p>
        </div>
        <div class="p-6">
            @csrf @method('PUT')
            @include('books._form')
        </div>
    </form>
@endsection
