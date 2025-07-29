/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#5a19e5',
        'custom-gray': '#f9f8fc',
        'custom-dark': '#120e1b',
        'custom-border': '#ebe7f3',
        'custom-text': '#654e97',
      },
    },
  },
  plugins: [],
};