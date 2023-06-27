/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{tsx,ts}",
    "./components/**/*.{tsx,ts}",
    
  ],
  theme: {
    extend: {
      fontFamily: {
        'Dosis': ['Dosis, sans-serif'],
        'Permanent': ["Permanent Marker", "cursive"]
      },
    },
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/line-clamp'),
  ],
  darkMode: 'class',
}
