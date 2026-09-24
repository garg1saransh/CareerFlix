import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
        },
        brand: "#fe4d0e",
      },
      boxShadow: {
        "soft-lg": "0 12px 40px rgba(15, 22, 30, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
