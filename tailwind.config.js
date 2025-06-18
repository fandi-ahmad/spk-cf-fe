/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brown-50': '#FFECDF',
        'brown-100': '#FFCCA8',
        'brown-200': '#EA9960',
        'brown-300': '#BC794A',
        'dark-brown-100': '#947158',
        'dark-brown-200': '#714221',
      },
    },
  },
  plugins: [],
}

