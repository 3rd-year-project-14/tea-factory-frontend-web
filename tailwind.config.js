/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tea: {
          900: "#20361F",
          800: "#2F5233",
          700: "#3E6B45",
          600: "#4A7C59",
          500: "#7CB342",
          100: "#E3EFDB",
          50: "#F2F7ED",
        },
        earth: {
          700: "#6E4A2F",
          600: "#8B5E3C",
          400: "#A9744F",
          100: "#F0E4D8",
        },
        surface: {
          DEFAULT: "#F7F4EF",
          dark: "#141B17",
        },
        card: {
          DEFAULT: "#FFFFFF",
          dark: "#1E2B22",
          border: {
            dark: "#2E3D34",
          },
        },
        ink: {
          DEFAULT: "#2C2C2C",
          dark: "#F0F0EC",
        },
        muted: {
          DEFAULT: "#6b7280",
          dark: "#8A928A",
        },
      },
      fontFamily: {
        heading: ["Poppins", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 10px -2px rgba(47, 82, 51, 0.12)",
        card: "0 4px 20px -4px rgba(47, 82, 51, 0.15)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui],
};
