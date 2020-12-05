const mix = require('laravel-mix');

mix.sass('src/app.scss', 'assets').setPublicPath('assets')