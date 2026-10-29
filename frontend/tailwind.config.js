/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        uksw: {
          50: '#eef4fb', 100: '#d9e6f5', 200: '#b5cdea', 300: '#86abd9',
          400: '#5486c4', 500: '#2f66ad', 600: '#1f4f93', 700: '#173f78',
          800: '#123260', 900: '#0e2750', 950: '#091a38',
        },
        gold: {
          50: '#fff9e5', 100: '#fff0b8', 200: '#ffe27a', 300: '#fdd043',
          400: '#f7bd16', 500: '#e3a508', 600: '#bf8004', 700: '#905c07',
        },
      },
    },
  },
  plugins: [],
}
