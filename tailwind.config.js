/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom colors for our theme
        primary: {
          DEFAULT: '#A78BFA', // Violet-400
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        dark: {
          DEFAULT: '#1E1E2D',
          50: '#2A2A3C',
          100: '#252534',
          200: '#1E1E2D',
          300: '#18181F',
          400: '#121218',
          500: '#0C0C10',
          600: '#060608',
          700: '#000000',
        },
      },
      backgroundColor: {
        'dark-card': '#2A2A3C',
      },
    },
  },
  plugins: [require('tailwindcss-primeui')],
};
