/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],  
  darkMode: ['selector', '[data-theme="dark"]'],


  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        'custom-yellow':'#BAA333',
        'ak-blue': {
          50: '#F4FBFF',
          100: '#E5F1FF',
          200: '#CBDCFF',
          300: '#AFC1FF',
          400: '#7989FF',
          500: '#3C46FF',
          600: '#0000FF',
          700: '#0404AC',
          800: '#020267',
          900: '#00002E',
        },        
      }
    },
  },  
  

  
};