module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    textColor: (theme) => ({
      ...theme('colors'),
      dallas: '#664A2D',
      'blue-charcoal': '#24292E',
      denim: '#0D66C2',
      'spring-green': '#05E776',
      flamingo: '#E65A4D',
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
