import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        bigTitle: ["100px", "normal"],
        title: ["80px", "normal"],
        smallTitle: ["56px", "normal"],
        smallContent: ["18px", "150%"],
        endTitle: ["4.5rem", "110%"],
        modalSub: ["0.75rem", "120%"],
        sign: ["10px", "120%"],
      },
      dropShadow: {
        mintPass: "22px 39px 20px rgba(0, 0, 0, 0.15)",
      },
      colors: {
        ...colors,
        ink: "#141414",
        washi: "#F9F9F0",
        dampWashi: "#EBEBE1",
        off: "#3B3B38",
        signBlack: "#3F3F3F",
        error: "#FF6928",
      },
      boxShadow: {
        skip: "inset 0 -40px 200px -100px rgb(0 0 0 / 1)",
      },
    },
  },
  plugins: [],
};
export default config;
