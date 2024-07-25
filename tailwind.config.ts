/* eslint-disable @typescript-eslint/no-var-requires */
import type { Config } from "tailwindcss";

const pxToRem = require("tailwindcss-preset-px-to-rem");

const config: Config = {
  presets: [pxToRem],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: { max: "480px" },
      md: "481px",
      lg: "769px",
      xl: "1280px",
    },
    extend: {
      colors: {
        brand: {
          primary: "#22b8cf",
          secondary: "#66d9e8",
          tertiary: "#A3E635",
        },
        point: {
          purple: "#A855F7",
          blue: "#3B82F6",
          green: "#10B981", // cyan 대신 green 으로 변경
          pink: "#EC4899",
          rose: "#F43F5E",
          orange: "#F97316",
          yellow: "#EAB308",
        },
        background: {
          primary: "#0F172A",
          secondary: "#1E293B",
          tertiary: "#334155",
          Inverse: "#FFF",
        },
        interaction: {
          inactive: "#94A3B8",
          hover: "#1EA2B5",
          pressed: "#198CA0",
          focus: "#22b8cf",
        },
        border: {
          primary: "#F8FAFC80",
        },
        text: {
          primary: "#F8FAFC",
          secondary: "#CBD5E1",
          tertiary: "#E2E8F0",
          default: "#64748B",
          inverse: "#FFFFFF",
          disabled: "#94A3B8",
        },
        status: {
          danger: "#DC2626",
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(to right, #22b8cf, #A3E635)",
      },
    },
    fontSize: {
      "lg-semibold": ["16px", { lineHeight: "19px", fontWeight: "600" }],
    },
  },
  plugins: [],
};
export default config;
