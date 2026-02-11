import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0B0F",
        accent: "#FFC857",
        "soft-white": "#F5F5F5",
        charcoal: "#111827",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        arabic: ["var(--font-cairo)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "var(--font-outfit)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-up": "fadeUp 0.8s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "glow-radial":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 200, 87, 0.15), transparent)",
        "glow-spot":
          "radial-gradient(circle at center, rgba(255, 200, 87, 0.08) 0%, transparent 70%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 200, 87, 0.15)",
        "glow-lg": "0 0 60px rgba(255, 200, 87, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
