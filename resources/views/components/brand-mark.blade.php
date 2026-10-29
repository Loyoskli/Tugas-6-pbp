@props(['size' => 'h-11 w-11'])
{{-- Taruh logo resmi di public/images/logo-uksw.png (disarankan PNG transparan). Jika belum ada, tampil monogram FTI. --}}
@if (file_exists(public_path('images/logo-uksw.png')))
    <span {{ $attributes->merge(['class' => $size . ' grid shrink-0 place-items-center rounded-xl bg-white p-1.5 shadow-sm']) }}>
        <img src="{{ asset('https://upload.wikimedia.org/wikipedia/commons/1/13/Fakultas_Teknologi_Informasi_UKSW_-_Kritis_Kreatif_Inovatif.png') }}" alt="Logo UKSW" class="max-h-full max-w-full object-contain">
    </span>
@else
    <span {{ $attributes->merge(['class' => $size . ' grid shrink-0 place-items-center rounded-xl bg-gold-400 text-sm font-extrabold tracking-tight text-uksw-950 shadow-sm']) }}>FTI</span>
@endif
