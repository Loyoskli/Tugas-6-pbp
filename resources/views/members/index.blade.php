@extends('layouts.library')

@section('title', 'Anggota')
@section('heading', 'Data anggota')

@section('content')
    @php $isAdmin = auth()->user()->role === 'admin'; @endphp

    <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <form method="GET" class="flex w-full gap-2 sm:w-auto">
            <div class="relative flex-1 sm:w-72">
                <svg class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"/></svg>
                <input name="q" value="{{ request('q') }}" placeholder="Cari nama atau email" class="field pl-9">
            </div>
            <button class="btn btn-primary">Cari</button>
        </form>
        @if ($isAdmin)
            <a href="{{ route('members.create') }}" class="btn btn-gold">+ Tambah anggota</a>
        @endif
    </div>

    <div class="card overflow-hidden">
        <div class="overflow-x-auto">
            <table class="table-campus">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Telepon</th>
                        <th>Alamat</th>
                        @if ($isAdmin) <th class="text-right">Aksi</th> @endif
                    </tr>
                </thead>
                <tbody>
                    @forelse ($members as $member)
                        <tr>
                            <td>
                                <div class="flex items-center gap-3">
                                    <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-uksw-100 text-sm font-bold text-uksw-800">{{ mb_strtoupper(mb_substr($member->name, 0, 1)) }}</span>
                                    <span class="font-semibold text-uksw-900">{{ $member->name }}</span>
                                </div>
                            </td>
                            <td>{{ $member->email }}</td>
                            <td>{{ $member->phone ?? '-' }}</td>
                            <td>{{ $member->address ?? '-' }}</td>
                            @if ($isAdmin)
                                <td>
                                    <div class="flex items-center justify-end gap-3">
                                        <a href="{{ route('members.edit', $member) }}" class="font-semibold text-uksw-700 hover:text-uksw-900 hover:underline">Ubah</a>
                                        <form method="POST" action="{{ route('members.destroy', $member) }}"
                                              onsubmit="return confirm('Hapus anggota ini?')">
                                            @csrf @method('DELETE')
                                            <button class="font-semibold text-rose-600 hover:text-rose-700 hover:underline">Hapus</button>
                                        </form>
                                    </div>
                                </td>
                            @endif
                        </tr>
                    @empty
                        <tr><td colspan="5" class="px-4 py-10 text-center text-slate-500">Tidak ada anggota yang cocok.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <div class="mt-4">{{ $members->links() }}</div>
@endsection
