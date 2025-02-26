// tailwind.config.js
const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        container: {
            screens: {
                sm: "640px",
                // => @media (min-width: 640px) { ... }

                md: "768px",
                // => @media (min-width: 768px) { ... }

                lg: "1024px",
                // => @media (min-width: 1024px) { ... }

                xl: "1280px",
                // => @media (min-width: 1280px) { ... }

                "2xl": "1410px",
                // => @media (min-width: 1410px) { ... }
            },
        },
        extend: {},
    },
    darkMode: "class",
    plugins: [heroui(), require("tailwind-scrollbar-hide")],
};
