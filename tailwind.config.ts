import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        "bg-2": "#080808",
        "bg-3": "#0E0E0E",
        panel: "#111111",
        ink: "#F4F1EA",
        "ink-muted": "#9CA3AF",
        navy: "#0B1E3F",
        "navy-2": "#0A1A38",
        cream: "#F4F1EA",
        "cream-2": "#E9E5DC",
        sage: "#8A9A6D",
        "sage-2": "#7A8A5D",
        gold: "#C9A962",
        "gold-2": "#B08C4F",
        amber: "#E8B84A",
        accent: "#D4AF7A",
        lime: "#C8FF00",
        "lime-2": "#B5E600",
      },
      fontFamily: {
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter-tight)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter-tight)", "system-ui", "sans-serif"],
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "gradient-shift": "gradientShift 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
        marquee: "marquee 24s linear infinite",
      },
      backgroundImage: {
        "gold-radial":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(201,169,98,0.18), transparent)",
        "navy-glow":
          "radial-gradient(ellipse 60% 40% at 70% 50%, rgba(11,30,63,0.35), transparent)",
        "gold-glow-bottom":
          "radial-gradient(ellipse 60% 40% at 50% 120%, rgba(201,169,98,0.12), transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
