/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
        rubik: ['Josefin Sans', 'sans-serif'],
        silk: ['Silkscreen','sans-serif'],
        outfit: ['Outfit','sans-serif']
      },
      screens: {
        'sm': '200px',
        // => @media (min-width: 992px) { ... }
      },
    },
  },
  plugins: [],
}

