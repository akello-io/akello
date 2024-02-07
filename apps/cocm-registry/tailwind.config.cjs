/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: '',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    './node_modules/daisyui/dist/**/*.js',    
    './node_modules/@akello/react/dist/**/*.js'    
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

