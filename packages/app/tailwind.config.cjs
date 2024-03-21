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
        'ak-red': '#FF4500',
        'ak-green': '#51DA4C',
        'ak-blue': '#0000FF',
        'ak-yellow': '#FFF639',
        'ak-magenta': '#FF45FF',
        'ak-magenta': '#FF45FF',
        'ak-cyan': '#00FFFF',        
      },
    }

  },
  plugins: [require("daisyui")],
}

