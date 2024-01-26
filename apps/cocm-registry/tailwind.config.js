/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"

  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  theme: {
    fontFamily: {
      display: ["Satisfy", "cursive"],
    },
    extend: {
      colors: {
        'ak-light-blue': '#3081FA',
        'crx-red': '#FF755F',
        'ak-dark-blue': '#001338',
        'ak-yellow': '#FFEC1F'
      },
    }

  },
  plugins: [require("daisyui")],
}

