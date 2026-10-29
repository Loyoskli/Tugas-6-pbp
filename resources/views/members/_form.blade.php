@php
    $fields = [
        ['name', 'Nama lengkap', 'text', true],
        ['email', 'Email', 'email', true],
        ['phone', 'Telepon', 'text', false],
        ['address', 'Alamat', 'text', false],
    ];
@endphp

<div class="grid gap-5">
    @foreach ($fields as [$name, $label, $type, $required])
        <div>
            <label for="{{ $name }}" class="mb-1 block text-sm font-semibold text-slate-700">
                {{ $label }} @if($required) <span class="text-rose-500">*</span> @endif
            </label>
            <input id="{{ $name }}" name="{{ $name }}" type="{{ $type }}"
                   value="{{ old($name, $member->$name) }}" @if($required) required @endif
                   class="field">
            @error($name) <p class="mt-1 text-sm text-rose-600">{{ $message }}</p> @enderror
        </div>
    @endforeach
</div>

<div class="mt-8 flex gap-3 border-t border-slate-100 pt-5">
    <button class="btn btn-primary px-6">Simpan</button>
    <a href="{{ route('members.index') }}" class="btn btn-outline px-6">Batal</a>
</div>
