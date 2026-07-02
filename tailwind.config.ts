import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",

  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/shared/**/*.{ts,tsx}",
    "./src/config/**/*.{ts,tsx}"
  ],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem"
      },
      screens: {
        "2xl": "1280px"
      }
    },

    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",

        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          soft: "hsl(var(--primary-soft))"
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },

        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))"
        },

        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))"
        },

        danger: {
          DEFAULT: "hsl(var(--danger))",
          foreground: "hsl(var(--danger-foreground))"
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))"
      },

      borderRadius: {
        xs: "0.375rem",
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem"
      },

      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.08)",
        glow: "0 0 45px rgba(79, 70, 229, 0.18)",
        card: "0 12px 30px rgba(15, 23, 42, 0.08)"
      },

      backgroundImage: {
        "hero-grid":
          "linear-gradient(to right, rgba(99,102,241,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.10) 1px, transparent 1px)",
        "math-gradient":
          "radial-gradient(circle at top left, rgba(99,102,241,0.25), transparent 35%), radial-gradient(circle at bottom right, rgba(14,165,233,0.25), transparent 40%)"
      },

      keyframes: {
        "fade-up": {
          from: {
            opacity: "0",
            transform: "translateY(16px)"
          },
          to: {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "float-slow": {
          "0%, 100%": {
            transform: "translateY(0)"
          },
          "50%": {
            transform: "translateY(-12px)"
          }
        },
        "pulse-soft": {
          "0%, 100%": {
            opacity: "0.7"
          },
          "50%": {
            opacity: "1"
          }
        }
      },

      animation: {
        "fade-up": "fade-up 0.45s ease-out both",
        "float-slow": "float-slow 5s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2.8s ease-in-out infinite"
      }
    }
  },

  plugins: []
};

export default config;