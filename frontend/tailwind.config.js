/** @type {import('tailwindcss').Config} */
import animations from "@midudev/tailwind-animations";

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        comforta: ["Comfortaa Variable", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [animations],
};
