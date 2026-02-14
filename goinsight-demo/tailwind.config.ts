import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#131926",
          "dark-navy": "#131926",
          sky: "#ecc41a",
          "light-blue": "#ecc41a",
          yellow: "#ecc41a",
          background: "#fefaf7",
          dark: "#101624",
          light: "#fefaf7",
          secondary: "#5c6370",
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(236, 196, 26, 0.5)",
        "glow-strong": "0 0 30px rgba(236, 196, 26, 0.7)",
        modal: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
