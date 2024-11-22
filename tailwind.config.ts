import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#5865f2",
        gray: {
          50: "#ECEDEE",
          100: "#DCDDDE",
          200: "#B9BBBE",
          300: "#8E9297",
          400: "#72767D",
          500: "#5C6067",
          550: "#4F545c",
          600: "#464950",
          700: "#36393F",
          800: "#2F3136",
          900: "#202225",
        },
      },
      fontFamily: {
        whitney: ["var(--font-whitney)"],
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwind-scrollbar-hide")],
} satisfies Config;
