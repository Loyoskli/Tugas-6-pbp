@extends('layouts.library')

@section('title', 'Ubah anggota')
@section('heading', 'Ubah anggota')

@section('content')
    <form method="POST" action="{{ route('members.update', $member) }}" class="card max-w-2xl overflow-hidden">
        <div class="border-b border-slate-200 bg-uksw-50 px-6 py-4">
            <h2 class="font-bold text-uksw-900">Ubah data anggota</h2>
            <p class="text-sm text-slate-500">Perbarui informasi anggota, tanda <span class="text-rose-500">*</span> wajib diisi.</p>
        </div>
        <div class="p-6">
            @csrf @method('PUT')
            @include('members._form')
        </div>
    </form>
@endsection
