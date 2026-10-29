<x-guest-layout>
    <div class="mb-6">
        <h2 class="text-2xl font-extrabold tracking-tight text-uksw-900">Masuk</h2>
        <p class="mt-1 text-sm text-slate-500">Gunakan akun perpustakaan kamu untuk melanjutkan.</p>
    </div>

    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" action="{{ route('login') }}" class="space-y-4">
        @csrf

        <div>
            <x-input-label for="email" value="Email" />
            <x-text-input id="email" class="block w-full" type="email" name="email" :value="old('email')" required autofocus autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <div>
            <x-input-label for="password" value="Kata sandi" />
            <x-text-input id="password" class="block w-full" type="password" name="password" required autocomplete="current-password" />
            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <div class="flex items-center justify-between">
            <label for="remember_me" class="inline-flex items-center gap-2">
                <input id="remember_me" type="checkbox" name="remember" class="rounded border-slate-300 text-uksw-700 shadow-sm focus:ring-uksw-600">
                <span class="text-sm text-slate-600">Ingat saya</span>
            </label>

            @if (Route::has('password.request'))
                <a class="text-sm font-semibold text-uksw-700 hover:text-uksw-900 hover:underline" href="{{ route('password.request') }}">Lupa kata sandi?</a>
            @endif
        </div>

        <x-primary-button class="w-full py-2.5">Masuk</x-primary-button>
    </form>

    @if (Route::has('register'))
        <p class="mt-6 text-center text-sm text-slate-500">
            Belum punya akun?
            <a href="{{ route('register') }}" class="font-semibold text-uksw-700 hover:underline">Daftar</a>
        </p>
    @endif
</x-guest-layout>
