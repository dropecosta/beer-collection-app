// tailwind.config.js
const forms = require('@tailwindcss/forms')
const lineClamp = require('@tailwindcss/line-clamp')

module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./components/ui/**/*.{ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        card: 'var(--card)',
        border: 'var(--border)',
        // ... other color variables
      },
    },
  },
  plugins: [forms, lineClamp],

}