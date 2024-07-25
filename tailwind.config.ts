import type { Config } from "tailwindcss";

const config: Config = {
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
          gradient: "linear-gradient(to right, #22b8cf, #A3E635)",
        },
        point: {
          purple: "#A855F7",
          blue: "#3B82F6",
          cyan: "#06B6D4", // 원래 primary인  #10B981 로 바꾸는 건 어떤가요?
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
          hover: "#1EA2B5", // Chat GPT가 추천해준 색상입니다. 별로면 추후에 변경해도 될 거 같아요.
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
        icon: {
          primary: "#64748B",
          inverse: "#F8FAFC",
          brand: "#22b8cf",
        },
      },
    },
    fontSize: {
      "lg-semibold": ["16px", { lineHeight: "19px", fontWeight: "600" }],
    },
  },
  plugins: [],
};
export default config;
