@php $isAdmin = auth()->user()->role === 'admin'; @endphp
<header class="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
    <div class="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-10">
        <div class="flex min-w-0 items-center gap-3">
            <button type="button" @click="sidebar = true" aria-label="Buka menu"
                    class="rounded-lg p-2 text-uksw-800 hover:bg-uksw-50 lg:hidden">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div class="min-w-0">
                <p class="hidden text-xs font-semibold uppercase tracking-widest text-gold-600 sm:block">FTI UKSW · Sistem Informasi Perpustakaan</p>
                <div class="truncate text-xl font-bold tracking-tight text-uksw-900">{{ $topbarTitle ?? '' }}</div>
            </div>
        </div>
        <span class="badge shrink-0 {{ $isAdmin ? 'badge-gold' : 'badge-slate' }}">
            {{ $isAdmin ? 'Admin: akses penuh' : 'User: hanya lihat' }}
        </span>
    </div>
</header>
