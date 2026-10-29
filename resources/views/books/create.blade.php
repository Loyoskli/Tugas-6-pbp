@extends('layouts.library')

@section('title', 'Tambah buku')
@section('heading', 'Tambah buku')

@section('content')
    <form method="POST" action="{{ route('books.store') }}" class="card max-w-2xl overflow-hidden">
        <div class="border-b border-slate-200 bg-uksw-50 px-6 py-4">
            <h2 class="font-bold text-uksw-900">Data buku baru</h2>
            <p class="text-sm text-slate-500">Isi data buku, tanda <span class="text-rose-500">*</span> wajib diisi.</p>
        </div>
        <div class="p-6">
            @csrf
            @include('books._form')
        </div>
    </form>
@endsection
