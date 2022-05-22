/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig} */
const config = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
  theme: {
    extend: {
      colors: {
        linen: {
          50: '#FAF5EF',
          100: '#F3E8DA',
          200: '#E6CDAF',
          300: '#D9B284',
          400: '#CB9859',
          500: '#B47C38',
          600: '#895F2B',
          700: '#5F411E',
          800: '#342410',
          900: '#090603',
        },
      },
    },
  },
};

module.exports = config;
