@php
    $isAdmin = auth()->user()->role === 'admin';
    $initial = mb_strtoupper(mb_substr(auth()->user()->name, 0, 1));
    $menu = [
        ['dashboard', 'Dashboard', 'M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10'],
        ['books.index', 'Buku', 'M4 5a2 2 0 012-2h12v16H6a2 2 0 00-2 2V5zm2 14h12'],
        ['members.index', 'Anggota', 'M16 11a4 4 0 10-8 0m-4 9a8 8 0 0116 0'],
    ];
@endphp

{{-- Latar gelap saat sidebar terbuka di HP --}}
<div x-show="sidebar" x-cloak x-transition.opacity @click="sidebar = false"
     class="fixed inset-0 z-30 bg-uksw-950/60 lg:hidden"></div>

<aside :class="sidebar ? 'translate-x-0' : '-translate-x-full'"
       class="fixed inset-y-0 left-0 z-40 flex w-72 flex-col overflow-y-auto bg-uksw-900 text-uksw-100 shadow-xl transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:translate-x-0 lg:shadow-none">
    <div class="h-1 bg-gold-400"></div>

    <div class="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <x-brand-mark />
        <div class="leading-tight">
            <p class="text-base font-extrabold tracking-tight text-white">Perpustakaan</p>
            <p class="text-xs text-gold-300">FTI · Universitas Kristen Satya Wacana</p>
        </div>
    </div>

    <p class="px-5 pb-1 pt-5 text-[11px] font-semibold uppercase tracking-widest text-uksw-300">Menu</p>
    <nav class="flex-1 space-y-1 px-3">
        @foreach ($menu as [$route, $label, $icon])
            @php $active = request()->routeIs(explode('.', $route)[0] . '*'); @endphp
            <a href="{{ route($route) }}"
               class="relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300
                      {{ $active ? 'bg-white/10 text-white' : 'text-uksw-200 hover:bg-white/5 hover:text-white' }}">
                @if ($active) <span class="absolute inset-y-2 left-0 w-1 rounded-r bg-gold-400"></span> @endif
                <svg class="h-5 w-5 {{ $active ? 'text-gold-300' : '' }}" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="{{ $icon }}"/></svg>
                {{ $label }}
            </a>
        @endforeach
    </nav>

    <div class="m-3 rounded-xl bg-white/5 p-4">
        <div class="flex items-center gap-3">
            <div class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-400 text-sm font-extrabold text-uksw-950">{{ $initial }}</div>
            <div class="min-w-0">
                <p class="truncate text-sm font-semibold text-white">{{ auth()->user()->name }}</p>
                <p class="text-xs text-uksw-300">{{ $isAdmin ? 'Admin' : 'User' }}</p>
            </div>
        </div>
        <div class="mt-3 flex items-center gap-4 border-t border-white/10 pt-3 text-sm">
            <a href="{{ route('profile.edit') }}" class="text-uksw-200 hover:text-white">Profil</a>
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button class="text-uksw-200 hover:text-white">Keluar</button>
            </form>
        </div>
    </div>
</aside>
