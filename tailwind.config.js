/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig} */
const config = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
  theme: {
    extend: {
      colors: {
        dallas: '#664A2D',
      },
    },
  },
};

module.exports = config;
