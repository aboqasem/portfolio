/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig} */
module.exports = {
  purge: {
    content: ['./pages/**/*.tsx', './components/**/*.tsx', './svgs/**/*.tsx'],
    options: {
      safelist: ['hover:text-blue-charcoal', 'hover:text-denim', 'hover:text-spring-green', 'hover:text-flamingo'],
    },
  },
  darkMode: false,
  theme: {
    extend: {
      textColor: {
        dallas: '#664A2D',
        'blue-charcoal': '#24292E',
        denim: '#0D66C2',
        'spring-green': '#05E776',
        flamingo: '#E65A4D',
        kilamanjaro: '#3F3530',
      },
      gradientColorStops: {
        'vista-white': '#E1DFDC',
      },
      transitionProperty: {
        spacing: 'margin, padding',
      },
      fontFamily: {
        'nova-mono': [
          '"Nova Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
