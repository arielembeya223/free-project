// webpack.mix.js

const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
   .postCss('resources/css/app.css', 'public/css', [
      // Add your PostCSS plugins here
   ]);

// Inclure regenerator-runtime dans le fichier d'entrée de votre application
mix.js('node_modules/regenerator-runtime/runtime.js', 'resources/js/app.js');
