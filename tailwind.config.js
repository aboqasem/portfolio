/** @type {import("tailwindcss").Config} */
export default {
  mode: "jit",
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}"],
  plugins: [import("@tailwindcss/forms")],
  theme: {
    extend: {
      keyframes: {
        "bounce-x": {
          "50%": {
            transform: "translateX(-25%)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
          },
          "0%, 100%": {
            transform: "none",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
        },
      },
      animation: {
        "bounce-x": "bounce-x 0.7s infinite",
      },
    },
  },
};
