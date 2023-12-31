/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// tailwind.config.js

// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   purge: {
//     content: [
//       "./index.html",
//       "./src/**/*.{js,ts,jsx,tsx}",
//     ],
//     safelist: ['effect1', 'effect2'],
//   },
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
