/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    './node_modules/daisyui/dist/**/*.js',
    './node_modules/@akello/react/dist/**/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

