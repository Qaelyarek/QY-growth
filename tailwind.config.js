/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        dark: '#030303',
        'dark-accent': '#0a0a0a',
      },
      animation: {
        'wave-pulse': 'wave-pulse 4s ease-in-out infinite',
      },
      keyframes: {
        'wave-pulse': {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.7 },
        },
      },
    },
  },
  plugins: [],
};