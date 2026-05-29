/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0ea5a4',
        slate: {
          950: '#020617',
          900: '#0b1220'
        },
        accent: {
          cyan: '#06b6d4',
          emerald: '#10b981'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial'],
        display: ['Sora', 'Inter']
      },
      container: {
        center: true,
        padding: '1rem'
      },
      boxShadow: {
        'xl-soft': '0 20px 40px rgba(2,6,23,0.6)'
      }
    }
  },
  plugins: []
}
