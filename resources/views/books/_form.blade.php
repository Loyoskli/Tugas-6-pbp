@php
    $fields = [
        ['title', 'Judul', 'text', true],
        ['author', 'Penulis', 'text', true],
        ['publisher', 'Penerbit', 'text', false],
        ['year', 'Tahun terbit', 'number', false],
        ['isbn', 'ISBN', 'text', false],
        ['category', 'Kategori', 'text', false],
        ['stock', 'Stok', 'number', true],
    ];
@endphp

<div class="grid gap-5 sm:grid-cols-2">
    @foreach ($fields as [$name, $label, $type, $required])
        <div class="{{ in_array($name, ['title', 'author']) ? 'sm:col-span-2' : '' }}">
            <label for="{{ $name }}" class="mb-1 block text-sm font-semibold text-slate-700">
                {{ $label }} @if($required) <span class="text-rose-500">*</span> @endif
            </label>
            <input id="{{ $name }}" name="{{ $name }}" type="{{ $type }}"
                   value="{{ old($name, $book->$name) }}" @if($required) required @endif
                   class="field">
            @error($name) <p class="mt-1 text-sm text-rose-600">{{ $message }}</p> @enderror
        </div>
    @endforeach
</div>

<div class="mt-8 flex gap-3 border-t border-slate-100 pt-5">
    <button class="btn btn-primary px-6">Simpan</button>
    <a href="{{ route('books.index') }}" class="btn btn-outline px-6">Batal</a>
</div>
