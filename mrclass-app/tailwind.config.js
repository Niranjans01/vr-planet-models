/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  colors: {
    black: '#000',
    white: '#fff',
    gray: {
      50: '#f9fafb',
      100: '#f4f5f7',
      200: '#e5e7eb',
      300: '#d2d6dc',
    },
    red: {
      50: '#fdf2f2',
      100: '#fde8e8',
      200: '#fbd5d5',
      300: '#f8b4b4',
    },
  },
  theme: {
    extend: {},
  },
  plugins: [],
}