/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],  
  darkMode: ['selector', '[data-theme="dark"]'],


  corePlugins: {
    preflight: false,
  },
  
};