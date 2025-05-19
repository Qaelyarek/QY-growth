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
          "100%": { backgroundPosition: "400% 0%" },
        },
      },
    },
  },
  plugins: [],
}