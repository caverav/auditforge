/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E6EAED',
          200: '#CDD5DB',
          300: '#B4C0C9',
          400: '#9BABB7',
          500: '#82969F',
          600: '#698187',
          700: '#506C6F',
          800: '#375757',
          900: '#132736', // Color principal
        },
        secondary: {
          100: '#E8F0F2',
          200: '#D1E1E5',
          300: '#BAD2D8',
          400: '#A3C3CB',
          500: '#8CB4BE',
          600: '#75A5B1',
          700: '#5E96A4',
          800: '#477797',
          900: '#2C3E50', // Color secundario principal
        },
        success: {
          500: '#2ECC71', // Verde
        },
        warning: {
          500: '#F1C40F', // Amarillo
        },
        danger: {
          500: '#E74C3C', // Rojo
        },
        gray: {
          100: '#F7F7F8',
          200: '#EFEFF1',
          300: '#E7E8EA',
          400: '#DFE0E3',
          500: '#D7D9DC',
          600: '#CFD1D5',
          700: '#C7CACD',
          800: '#BFC2C6',
          900: '#82898F', // Gris terciario
        },
        white: '#E3E4E5', // Blanco terciario
      },
      keyframes: {
        floting: {
          '0%,100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(15px)',
          },
        },
        shadow: {
          '0%,100%': {
            transform: 'scale(1,1)',
          },
          '50%': {
            transform: 'scale(.85,.85)',
          },
        },
      },
      animation: {
        floting: 'floting 2.5s infinite',
        shadow: 'shadow 2.5s infinite',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
