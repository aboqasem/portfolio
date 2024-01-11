import prettierrc from '@aboqasem/prettierrc' assert { type: 'json' };

/** @type {import('prettier').Config} */
export default {
  ...prettierrc,
  plugins: ['prettier-plugin-tailwindcss'],
};
