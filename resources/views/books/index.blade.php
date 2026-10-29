@extends('layouts.library')

@section('title', 'Buku')
@section('heading', 'Data buku')

@section('content')
    @php $isAdmin = auth()->user()->role === 'admin'; @endphp

    <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <form method="GET" class="flex w-full gap-2 sm:w-auto">
            <div class="relative flex-1 sm:w-72">
                <svg class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"/></svg>
                <input name="q" value="{{ request('q') }}" placeholder="Cari judul atau penulis" class="field pl-9">
            </div>
            <button class="btn btn-primary">Cari</button>
        </form>
        @if ($isAdmin)
            <a href="{{ route('books.create') }}" class="btn btn-gold">+ Tambah buku</a>
        @endif
    </div>

    <div class="card overflow-hidden">
        <div class="overflow-x-auto">
            <table class="table-campus">
                <thead>
                    <tr>
                        <th>Judul</th>
                        <th>Penulis</th>
                        <th>Kategori</th>
                        <th>Tahun</th>
                        <th>Stok</th>
                        @if ($isAdmin) <th class="text-right">Aksi</th> @endif
                    </tr>
                </thead>
                <tbody>
                    @forelse ($books as $book)
                        <tr>
                            <td class="font-semibold text-uksw-900">{{ $book->title }}</td>
                            <td>{{ $book->author }}</td>
                            <td>
                                @if ($book->category) <span class="badge badge-blue">{{ $book->category }}</span> @else - @endif
                            </td>
                            <td>{{ $book->year ?? '-' }}</td>
                            <td><span class="badge {{ $book->stock <= 2 ? 'badge-gold' : 'badge-green' }}">{{ $book->stock }}</span></td>
                            @if ($isAdmin)
                                <td>
                                    <div class="flex items-center justify-end gap-3">
                                        <a href="{{ route('books.edit', $book) }}" class="font-semibold text-uksw-700 hover:text-uksw-900 hover:underline">Ubah</a>
                                        <form method="POST" action="{{ route('books.destroy', $book) }}"
                                              onsubmit="return confirm('Hapus buku ini?')">
                                            @csrf @method('DELETE')
                                            <button class="font-semibold text-rose-600 hover:text-rose-700 hover:underline">Hapus</button>
                                        </form>
                                    </div>
                                </td>
                            @endif
                        </tr>
                    @empty
                        <tr><td colspan="6" class="px-4 py-10 text-center text-slate-500">Tidak ada buku yang cocok.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <div class="mt-4">{{ $books->links() }}</div>
@endsection
