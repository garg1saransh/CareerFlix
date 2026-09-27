import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#9d6fff",
          600: "#8b5cf6",
          700: "#7c3aed",
        },
        brand: "#9d6fff",
      },
      boxShadow: {
        "soft-lg": "0 12px 40px rgba(15, 22, 30, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
