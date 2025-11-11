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
          100: '#E3F2FD',
          600: '#1565C0'
        },
        surface: '#F7F8FA',
        line: '#E2E8F0',
        ok: '#16A34A',
        warn: '#F59E0B',
        danger: '#DC2626',
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
