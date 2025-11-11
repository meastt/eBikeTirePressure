import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1E88E5',
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          600: '#1565C0',
          dark: '#0D47A1',
        },
        surface: '#F7F8FA',
        line: '#E2E8F0',
        success: {
          DEFAULT: '#16A34A',
          50: '#F0FDF4',
          dark: '#15803D',
        },
        warn: {
          DEFAULT: '#F59E0B',
          50: '#FFFBEB',
          dark: '#B45309',
        },
        danger: {
          DEFAULT: '#DC2626',
          50: '#FEF2F2',
          dark: '#991B1B',
        },
        info: '#0284C7',
        text: '#0F172A',
        muted: '#475569',
        bg: '#0B0D0F',
      },
      boxShadow: {
        card: '0 4px 20px rgba(15,23,42,0.06)'
      },
      borderRadius: {
        xl: '14px',
        '2xl': '18px'
      }
    },
  },
  plugins: [],
};

export default config;
