<!DOCTYPE html>
<html lang="id">
<head>
    @include('layouts.partials.head', ['pageTitle' => 'Masuk'])
</head>
<body class="font-sans text-slate-900 antialiased">
<div class="min-h-screen lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">

    {{-- Panel branding (desktop) --}}
    <aside class="relative hidden overflow-hidden bg-gradient-to-br from-uksw-950 via-uksw-900 to-uksw-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div class="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold-400/15"></div>
        <div class="absolute -bottom-32 -left-20 h-96 w-96 rounded-full border-[40px] border-white/5"></div>

        <div class="relative flex items-center gap-3">
            <x-brand-mark size="h-14 w-14" />
            <div class="leading-tight">
                <p class="text-sm font-semibold text-gold-300">Fakultas Teknologi Informasi</p>
                <p class="text-lg font-extrabold tracking-tight">Universitas Kristen Satya Wacana</p>
            </div>
        </div>

        <div class="relative">
            <span class="inline-block h-1 w-14 rounded bg-gold-400"></span>
            <h1 class="mt-5 text-4xl font-extrabold leading-tight tracking-tight">Sistem Informasi<br>Perpustakaan</h1>
            <p class="mt-4 max-w-md text-uksw-200">Kelola koleksi buku dan data anggota perpustakaan.</p>
        </div>

        <p class="relative text-xs text-uksw-300">© {{ date('Y') }} FTI · Universitas Kristen Satya Wacana</p>
    </aside>

    {{-- Form --}}
    <main class="flex min-h-screen flex-col bg-slate-50">
        <div class="h-1.5 bg-gold-400 lg:hidden"></div>
        <div class="flex flex-1 items-center justify-center px-6 py-10">
            <div class="w-full max-w-md">
                <div class="mb-6 flex items-center gap-3 lg:hidden">
                    <x-brand-mark />
                    <div class="leading-tight">
                        <p class="text-base font-extrabold text-uksw-900">Perpustakaan FTI</p>
                        <p class="text-xs text-slate-500">Universitas Kristen Satya Wacana</p>
                    </div>
                </div>

                <div class="card p-8">
                    {{ $slot }}
                </div>
            </div>
        </div>
    </main>
</div>
</body>
</html>
