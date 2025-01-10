import type { Config } from "tailwindcss";

import svgToDataUri from "mini-svg-data-uri";
// @ts-expect-error tailwindcss/lib/util/flattenColorPalette is not typed
import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        // Main Colors
        nebula: "#00B6E7",
        helix: "#22CCEE",
        trifid: "#2ED3B7",
        aurora: "#76d484",
        comet: "#94E5A0",
        cosmic: "#A4D756",
        venus: "#C7F284",

        // Neutrals
        space: "#0C0C0C",
        meteorite: "#151514",
        charcoal: "#1d1d1c",
        gunmetal: "#30302e",
        steel: "#707070",
        cloud: "#e8f9ff",

        // Gradients
        gradient: {
          1: "linear-gradient(90deg, #00B6E7, #A4D756)", // Nebula Blue to Cosmic Lime
          2: "linear-gradient(90deg, #22CCEE, #2ED3B7)", // Helix Cyan to Trifid Teal
          3: "linear-gradient(90deg, #2ED3B7, #C7F284)", // Trifid Teal to Venus Lime
        },

        // Theme Configuration
        background: {
          DEFAULT: "#e8f9ff", // Cloud
          dark: "#0C0C0C", // Space Black
        },
        foreground: {
          DEFAULT: "#1d1d1c", // Charcoal
          dark: "#e8f9ff", // Cloud
        },
        card: {
          DEFAULT: "#ffffff", // White
          foreground: "#1d1d1c", // Charcoal
          dark: "#151514", // Meteorite
          "dark-foreground": "#e8f9ff", // Cloud
        },
        popover: {
          DEFAULT: "#ffffff", // White
          foreground: "#1d1d1c", // Charcoal
          dark: "#151514", // Meteorite
          "dark-foreground": "#e8f9ff", // Cloud
        },
        primary: {
          DEFAULT: "#00B6E7", // Nebula Blue
          foreground: "#ffffff",
          dark: "#22CCEE", // Helix Cyan
          "dark-foreground": "#0C0C0C", // Space Black
        },
        secondary: {
          DEFAULT: "#2ED3B7", // Trifid Teal
          foreground: "#ffffff",
          dark: "#76d484", // Aurora Green
          "dark-foreground": "#0C0C0C", // Space Black
        },
        muted: {
          DEFAULT: "#707070", // Steel
          foreground: "#30302e", // Gunmetal
          dark: "#30302e", // Gunmetal
          "dark-foreground": "#707070", // Steel
        },
        accent: {
          DEFAULT: "#22CCEE", // Helix Cyan
          foreground: "#ffffff",
          dark: "#2ED3B7", // Trifid Teal
          "dark-foreground": "#0C0C0C", // Space Black
        },
        destructive: {
          DEFAULT: "#ff4444",
          foreground: "#ffffff",
          dark: "#ff6666",
          "dark-foreground": "#ffffff",
        },
        border: {
          DEFAULT: "#30302e", // Gunmetal
          dark: "#1d1d1c", // Charcoal
        },
        input: {
          DEFAULT: "#30302e", // Gunmetal
          dark: "#1d1d1c", // Charcoal
        },
        ring: {
          DEFAULT: "#00B6E7", // Nebula Blue
          dark: "#22CCEE", // Helix Cyan
        },
        chart: {
          "1": "#00B6E7", // Nebula Blue
          "2": "#22CCEE", // Helix Cyan
          "3": "#2ED3B7", // Trifid Teal
          "4": "#76d484", // Aurora Green
          "5": "#A4D756", // Cosmic Lime
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-dot-thick": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
