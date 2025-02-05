/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vark: {
          primary: '#6366f1',
          secondary: '#a855f7',
          light: '#f5f3ff',
          indigo: '#4c51bf', // define your custom colors if needed
        purple: '#9f7aea',
        pink: '#f687b3',
        rose: '#f56565',
        },
      },
      animation: {
        'slide-in': 'slideInFromBottom 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
  safelist: [
    'border-indigo-500',
    'border-purple-500',
    'border-pink-500',
    'border-rose-500',
    'text-indigo-900',
    'text-purple-900',
    'text-pink-900',
    'text-rose-900',
  ],
  plugins: [],
};