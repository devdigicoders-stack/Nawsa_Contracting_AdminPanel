/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          navy: '#4A4B50',
          deep: '#111111',
          corporate: '#333333',
        },
        gold: {
          primary: '#B20D17',
          light: '#9A0B14',
        },
        warm: {
          white: '#F7F6F2',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        heading: ['"Outfit"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
