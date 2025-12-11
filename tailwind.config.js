/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FFD6E8',
          lavender: '#E6D5FF',
          mint: '#D5FFE6',
          peach: '#FFE6D5',
          blue: '#D5E6FF',
          purple: '#E6D5FF',
        },
      },
    },
  },
  plugins: [],
}

