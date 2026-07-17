/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f6f8fb',
          100: '#eceff5',
          200: '#d6dce8',
          300: '#b3bdd1',
          400: '#8896b3',
          500: '#667498',
          600: '#505c7c',
          700: '#404a64',
          800: '#363f54',
          900: '#1e2533',
          950: '#131826',
        },
        brand: {
          50: '#eef7ff',
          100: '#d9edff',
          200: '#bce0ff',
          300: '#8ecdff',
          400: '#59b0ff',
          500: '#3390fb',
          600: '#1c70f0',
          700: '#1559dc',
          800: '#1849b2',
          900: '#193f8c',
          950: '#142855',
        },
        teal: {
          50: '#effcf9',
          100: '#c9f7ef',
          200: '#93eee0',
          300: '#54ddcd',
          400: '#25c3b6',
          500: '#0da39c',
          600: '#00827e',
          700: '#016864',
          800: '#065351',
          900: '#0a4544',
          950: '#002726',
        },
        accent: {
          400: '#f5a524',
          500: '#e0890b',
          600: '#b86f00',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(19, 24, 38, 0.08), 0 8px 24px -8px rgba(19, 24, 38, 0.10)',
        lift: '0 10px 30px -10px rgba(19, 24, 38, 0.18), 0 4px 12px -4px rgba(19, 24, 38, 0.10)',
        glow: '0 0 0 4px rgba(28, 112, 240, 0.15)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.5s ease-out both',
        'scale-in': 'scale-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-right': 'slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};
