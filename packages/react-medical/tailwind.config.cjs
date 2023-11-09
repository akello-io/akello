/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  darkMode: ['class', '[data-mode="dark"]'],
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
  plugins: [
    require("daisyui")
  ],
  safelist: [
    {
      // TODO: was unable to get imported components to have the styles load. I believe this has to do
      // with the Just-In-Time loader with Tailwind...
      pattern: /./, // the "." means "everything"
    },
  ],
}

