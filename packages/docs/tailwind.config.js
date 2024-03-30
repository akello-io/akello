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
        'ak-red': {
          50: '#FFF7F6',
          100: '#FFEDEB',
          200: '#FFE0DB',
          300: '#FFD3C9',
          400: '#FFB7A4',
          500: '#FF9574',
          600: '#FF6E3C',
          700: '#FF4500',
          800: '#AA2E00',
          900: '#541600',
        },
      }
    },
  },  
  

  
};