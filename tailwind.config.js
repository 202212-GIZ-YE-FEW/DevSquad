/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    orange: "#FDA855",
                    blue: "#0180AB",
                    gray: "#878787",
                },
                secondry: {
                    orange: "#FBC495",
                },
            },
            fontFamily: {
                Rubik: ["Rubik", "sans-serif"],
            },
        },
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
