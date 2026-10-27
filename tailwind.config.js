/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        way: {
          navy: "#07152e",
          blue: "#0d2a55",
          ice: "#dcecff",
          silver: "#b7c7dc"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Manrope", "Inter", "sans-serif"]
      }
    }
  },
  plugins: []
};