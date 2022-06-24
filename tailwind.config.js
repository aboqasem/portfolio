/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig} */
const config = {
  mode: 'jit',
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}'],
  plugins: [require('@tailwindcss/forms')],
  theme: {
    extend: {},
  },
};

module.exports = config;
