/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Design system FocusPal
        background: "#F5F7F2",
        surface: "#FFFFFF",
        border: "#E0EDD8",
        // Verde principal
        primary: {
          DEFAULT: "#4A9E3F",
          dark: "#2E7A25",
          light: "#EBF5E4",
          border: "#B8D9A4",
        },
        // Textos
        text: {
          primary: "#1A2E14",
          secondary: "#6B8C62",
          muted: "#8AAE80",
        },
        // Estados de peligro (unlock request)
        danger: {
          DEFAULT: "#D84820",
          light: "#FFF3F0",
          border: "#F5C4B3",
        },
        // Avisos
        warning: {
          DEFAULT: "#E0A000",
          light: "#FFF9EC",
          border: "#F5DFA4",
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
