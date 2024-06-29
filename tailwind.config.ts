import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Luckiest Guy'", "cursive"],
        body: ["'Comic Sans MS'", "sans-serif"],
      },
      colors: {
        primary: "#03AED2",
        secondary: "#68D2E8",
        tertiary: "#FDDE55",
        quaternary: "#FEEFAD",
        font: "#071952",
      },
      backgroundImage: {
        'geometric-circle': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
      gradientColorStops: {
        from: '#03AED2',
        to: 'rgba(3, 174, 210, 0)', 
      },
    },
  },
  plugins: [
    require('tailwindcss-bg-patterns'), 
  ],
};

export default config;
