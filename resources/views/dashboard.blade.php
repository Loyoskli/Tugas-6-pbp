@extends('layouts.library')

@section('title', 'Dashboard')
@section('heading', 'Dashboard')

@section('content')
    @php $isAdmin = auth()->user()->role === 'admin'; @endphp

    {{-- Banner sambutan --}}
    <section class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-uksw-900 via-uksw-800 to-uksw-600 px-6 py-8 text-white shadow-sm sm:px-8">
        <div class="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gold-400/20"></div>
        <div class="absolute -bottom-16 right-24 h-40 w-40 rounded-full border-[20px] border-white/5"></div>
        <div class="relative">
            <p class="text-sm font-semibold text-gold-300">Selamat datang</p>
            <h2 class="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">Halo, {{ auth()->user()->name }}</h2>
            <p class="mt-2 max-w-xl text-sm text-uksw-100">
                @if ($isAdmin)
                    Kamu bisa menambah, mengubah, dan menghapus data perpustakaan.
                @else
                    Kamu bisa melihat data buku dan anggota.
                @endif
            </p>
            @if ($isAdmin)
                <div class="mt-5 flex flex-wrap gap-3">
                    <a href="{{ route('books.create') }}" class="btn btn-gold">Tambah buku</a>
                    <a href="{{ route('members.create') }}" class="btn border border-white/30 text-white hover:bg-white/10">Tambah anggota</a>
                </div>
            @endif
        </div>
    </section>

    {{-- Statistik --}}
    <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        @foreach ([
            ['Judul buku', $totalBooks, 'M4 5a2 2 0 012-2h12v16H6a2 2 0 00-2 2V5zm2 14h12', 'bg-uksw-50 text-uksw-700'],
            ['Total eksemplar', $totalStock, 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4', 'bg-gold-100 text-gold-700'],
            ['Kategori', $totalCats, 'M7 7h.01M7 3h5a1.99 1.99 0 011.41.59l7 7a2 2 0 010 2.82l-5 5a2 2 0 01-2.82 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z', 'bg-emerald-50 text-emerald-700'],
            ['Anggota', $totalMembers, 'M16 11a4 4 0 10-8 0m-4 9a8 8 0 0116 0', 'bg-rose-50 text-rose-700'],
        ] as [$label, $value, $icon, $tone])
            <div class="card flex items-center gap-4 p-5">
                <span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl {{ $tone }}">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="{{ $icon }}"/></svg>
                </span>
                <div>
                    <p class="text-sm text-slate-500">{{ $label }}</p>
                    <p class="text-3xl font-extrabold tracking-tight text-uksw-900">{{ $value }}</p>
                </div>
            </div>
        @endforeach
    </div>

    {{-- Buku terbaru --}}
    <section class="card mt-6 overflow-hidden">
        <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h2 class="font-bold text-uksw-900">Buku terbaru</h2>
            <a href="{{ route('books.index') }}" class="text-sm font-semibold text-uksw-700 hover:text-uksw-900 hover:underline">Lihat semua buku →</a>
        </div>
        <ul class="divide-y divide-slate-100">
            @forelse ($latestBooks as $book)
                <li class="flex items-center justify-between gap-4 px-5 py-3.5">
                    <div class="flex min-w-0 items-center gap-3">
                        <span class="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-uksw-900 text-sm font-bold text-gold-300">{{ mb_strtoupper(mb_substr($book->title, 0, 1)) }}</span>
                        <div class="min-w-0">
                            <p class="truncate font-semibold text-slate-800">{{ $book->title }}</p>
                            <p class="truncate text-sm text-slate-500">{{ $book->author }}</p>
                        </div>
                    </div>
                    <span class="badge shrink-0 {{ $book->stock <= 2 ? 'badge-gold' : 'badge-green' }}">Stok {{ $book->stock }}</span>
                </li>
            @empty
                <li class="px-5 py-8 text-center text-slate-500">Belum ada buku.</li>
            @endforelse
        </ul>
    </section>
@endsection
