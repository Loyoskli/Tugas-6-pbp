@extends('layouts.library')

@section('title', 'Tambah anggota')
@section('heading', 'Tambah anggota')

@section('content')
    <form method="POST" action="{{ route('members.store') }}" class="card max-w-2xl overflow-hidden">
        <div class="border-b border-slate-200 bg-uksw-50 px-6 py-4">
            <h2 class="font-bold text-uksw-900">Data anggota baru</h2>
            <p class="text-sm text-slate-500">Isi data anggota, tanda <span class="text-rose-500">*</span> wajib diisi.</p>
        </div>
        <div class="p-6">
            @csrf
            @include('members._form')
        </div>
    </form>
@endsection
