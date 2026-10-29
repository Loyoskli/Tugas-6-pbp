<!DOCTYPE html>
<html lang="id">
<head>
    @include('layouts.partials.head', ['pageTitle' => 'Profil'])
</head>
<body class="font-sans antialiased">
<div x-data="{ sidebar: false }" class="min-h-screen lg:flex">
    @include('layouts.partials.sidebar')

    <div class="flex min-w-0 flex-1 flex-col">
        @include('layouts.partials.topbar', ['topbarTitle' => $header ?? ''])

        <main class="flex-1 px-4 py-6 sm:px-6 lg:px-10">
            @include('layouts.partials.flash')
            {{ $slot }}
        </main>

        @include('layouts.partials.footer')
    </div>
</div>
</body>
</html>
