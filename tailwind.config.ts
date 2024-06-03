import type { Config } from "tailwindcss";

interface PluginUtils {
  addUtilities: (utilities: any, options?: any) => void;
}

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#111",
        grey: "#bbb",
        white: "#e9e9e9",
        orange: "#ebad30",
        blue: "#50c7e3",
        flash: "#444",
        mint: "#48b595",
      },
      borderRadius: {
        custom: "32px",
      },
      transitionDelay: {
        "800": "800ms",
      },
      translate: {
        center: "-50%",
      },
      transitionDuration: {
        "450": "0.45s",
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
      backfaceVisibility: {
        hidden: "hidden",
      },
      brightness: {
        25: ".25",
        60: ".6",
        70: ".7",
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
        "custom-fade":
          "linear-gradient(to top, #111 0%, rgba(0, 0, 0, 0.738) 19%, rgba(0, 0, 0, 0.541) 34%, rgba(0, 0, 0, 0.382) 47%, rgba(0, 0, 0, 0.278) 56.5%, rgba(0, 0, 0, 0.194) 65%, rgba(0, 0, 0, 0.126) 73%, rgba(0, 0, 0, 0.075) 80.2%, rgba(0, 0, 0, 0.042) 86.1%, rgba(0, 0, 0, 0.021) 91%, rgba(0, 0, 0, 0.008) 95.2%, rgba(0, 0, 0, 0.002) 98.2%, transparent 100%)",
      },
    },
  },
  corePlugins: {
    backdropFilter: true,
  },
  plugins: [
    function ({ addUtilities }: PluginUtils) {
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
