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
      // 3xl
      "3xl-bold": ["32px", { lineHeight: "38px", fontWeight: "700" }],
      "3xl-semibold": ["32px", { lineHeight: "38px", fontWeight: "600" }],

      // 2xl
      "2xl-bold": ["24px", { lineHeight: "28px", fontWeight: "700" }],
      "2xl-semibold": ["24px", { lineHeight: "28px", fontWeight: "600" }],
      "2xl-medium": ["24px", { lineHeight: "28px", fontWeight: "500" }],
      "2xl-regular": ["24px", { lineHeight: "28px", fontWeight: "400" }],

      // xl
      "xl-bold": ["20px", { lineHeight: "24px", fontWeight: "700" }],
      "xl-semibold": ["20px", { lineHeight: "24px", fontWeight: "600" }],
      "xl-medium": ["20px", { lineHeight: "24px", fontWeight: "500" }],
      "xl-regular": ["20px", { lineHeight: "24px", fontWeight: "400" }],

      // 2lg
      "2lg-bold": ["18px", { lineHeight: "21px", fontWeight: "700" }],
      "2lg-semibold": ["18px", { lineHeight: "21px", fontWeight: "600" }],
      "2lg-medium": ["18px", { lineHeight: "21px", fontWeight: "500" }],
      "2lg-regular": ["18px", { lineHeight: "21px", fontWeight: "400" }],

      // lg
      "lg-bold": ["16px", { lineHeight: "19px", fontWeight: "700" }],
      "lg-semibold": ["16px", { lineHeight: "19px", fontWeight: "600" }],
      "lg-medium": ["16px", { lineHeight: "19px", fontWeight: "500" }],
      "lg-regular": ["16px", { lineHeight: "19px", fontWeight: "400" }],

      // md
      "md-bold": ["14px", { lineHeight: "17px", fontWeight: "700" }],
      "md-semibold": ["14px", { lineHeight: "17px", fontWeight: "600" }],
      "md-medium": ["14px", { lineHeight: "17px", fontWeight: "500" }],
      "md-regular": ["14px", { lineHeight: "17px", fontWeight: "400" }],

      // sm
      "sm-semibold": ["13px", { lineHeight: "16px", fontWeight: "600" }],
      "sm-medium": ["13px", { lineHeight: "16px", fontWeight: "500" }],

      // xs
      "xs-semibold": ["12px", { lineHeight: "14px", fontWeight: "600" }],
      "xs-medium": ["12px", { lineHeight: "14px", fontWeight: "500" }],
      "xs-regular": ["12px", { lineHeight: "14px", fontWeight: "400" }],
    },
  },
  plugins: [],
};
export default config;
