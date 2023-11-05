/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('@akello/react')
  ],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  safelist: [
    {
      // TODO: was unable to get imported components to have the styles load. I believe this has to do
      // with the Just-In-Time loader with Tailwind...
      pattern: /./, // the "." means "everything"
    },
  ],
}