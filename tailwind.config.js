module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    options: {
      safelist: ['hover:text-blue-charcoal', 'hover:text-denim', 'hover:text-spring-green', 'hover:text-flamingo'],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        dallas: '#664A2D',
        'blue-charcoal': '#24292E',
        denim: '#0D66C2',
        'spring-green': '#05E776',
        flamingo: '#E65A4D',
      },
      gradientColorStops: {
        'vista-white': '#E1DFDC',
      },
      transitionProperty: {
        spacing: 'margin, padding',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
