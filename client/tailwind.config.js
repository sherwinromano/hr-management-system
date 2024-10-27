/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#7152f3",
        secondary: "#a3d139",
        tertiary: "#b21589",
      },
      borderColor: {
        primary: "#7152f3",
      },
      textColor: {
        primary: "#7152f3",
        "dark-500": "#16151c",
        "gray-500": "#a2a1a8",
      },
    },
  },
  plugins: [],
};
