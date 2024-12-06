/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#0f1115',
          800: '#1a1d23',
          700: '#2a2f3a',
          600: '#404653',
          500: '#5c6474',
          400: '#8f96a3',
          300: '#b4b9c3',
          200: '#d4d7dd',
          100: '#e9eaed',
        },
        purple: {
          500: '#8b5cf6',
          400: '#a78bfa',
        },
      },
    },
  },
  plugins: [],
};