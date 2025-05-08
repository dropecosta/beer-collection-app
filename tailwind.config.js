// tailwind.config.js
const forms = require('@tailwindcss/forms')
const lineClamp = require('@tailwindcss/line-clamp')

module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./components/ui/**/*.{ts,tsx}"
  ],
  theme: { extend: {} },
  plugins: [forms, lineClamp],
}