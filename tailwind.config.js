module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    textColor: (theme) => ({
      ...theme('colors'),
      dallas: '#664A2D',
    }),
    gradientColorStops: (theme) => ({
      ...theme('colors'),
      'vista-white': '#E1DFDC',
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
