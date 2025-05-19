/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "star-border": "star-border 3s linear infinite",
      },
      keyframes: {
        "star-border": {
          "0%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "200% 0%" },
          "100%": { backgroundPosition: "400% 0%" },
        },
      },
      boxShadow: {
        'glow-green': '0 0 25px rgba(57, 255, 20, 0.4)',
        'glow-white': '0 0 25px rgba(255, 255, 255, 0.25)',
      }
    },
  },
  plugins: [],
}