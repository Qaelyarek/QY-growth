/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, white 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};