import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        brand: {
          50: '#effafa',
          100: '#d7f1f2',
          200: '#b0e3e6',
          300: '#78cfd5',
          400: '#3fb3bd',
          500: '#2596a2',
          600: '#227986',
          700: '#20636e',
          800: '#21525b',
          900: '#21454d',
          950: '#102e36',
        },
        copper: {
          50: '#faf6f1',
          100: '#f3e9da',
          200: '#e6d1b3',
          300: '#d7b382',
          400: '#c99355',
          500: '#bd7f3e',
          600: '#a86a34',
          700: '#87552c',
          800: '#6f4629',
          900: '#5b3a24',
        },
        ink: {
          50: '#f6f7f8',
          100: '#eaecee',
          200: '#d9dde1',
          300: '#b8c0c8',
          400: '#919da9',
          500: '#728092',
          600: '#5d6878',
          700: '#4c5462',
          800: '#22282f',
          900: '#161a20',
          950: '#0b0e12',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Inter', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        surface: '0 1px 2px rgba(0,0,0,0.05)',
        elevated: '0 4px 12px rgba(0,0,0,0.1)',
      },
      borderRadius: {
        xs: '2px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
      },
    },
  },
  plugins: [],
};
export default config;
