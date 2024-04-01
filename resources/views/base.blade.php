<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css">
        <title>Free social</title>
        @vitereactrefresh
        @vite(['resources/sass/app.scss','resources/js/app.js',])
    </head>
    <body class="antialiased">
        <style>
        
.nav-link.active {
  color: #fff; 
}
        </style>
        @yield('content')
        <script>
            window.routes = {
                connect: "{{ route('connect') }}",
                inscription:"{{Route('inscription')}}",
                home:"{{Route('welcome')}}"
            };
        </script>
    </body>