import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#222",
        grey: "#bbb",
        white: "#e9e9e9",
        flash: "#444",
      },
      borderRadius: {
        custom: "32px",
      },
      maxHeight: {
        "0": "0",
        "20": "5rem",
        "40": "10rem",
        full: "100%",
      },
      maxWidth: {
        "video-vw": "calc(140.778vh)",
      },
      height: {
        "video-vh": "calc(40.25vw)",
      },
      brightness: {
        25: ".25",
        80: ".8",
        175: "1.75",
      },
      width: {
        150: "150%",
      },
      scale: {
        105: "1.05",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        ".iframe-rounded": {
          "& > div > iframe": {
            "border-radius": "24px",
          },
        },
      });
    },
  ],
};

export default config;
