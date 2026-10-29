import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

const uksw = {
    50: '#eef4fb', 100: '#d9e6f5', 200: '#b5cdea', 300: '#86abd9', 400: '#5486c4',
    500: '#2f66ad', 600: '#1f4f93', 700: '#173f78', 800: '#123260', 900: '#0e2750', 950: '#091a38',
};
const gold = {
    50: '#fff9e5', 100: '#fff0b8', 200: '#ffe27a', 300: '#fdd043', 400: '#f7bd16',
    500: '#e3a508', 600: '#bf8004', 700: '#905c07',
};

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',

    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                uksw,
                gold,
                indigo: uksw,
            },
        },
    },

    plugins: [forms],
};
