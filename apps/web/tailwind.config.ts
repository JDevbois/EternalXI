import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        parchment: '#F5E6C8',
        'parchment-dark': '#E8D4A8',
        cream: '#FAF0DC',
        sepia: '#C4A35A',
        'sepia-dark': '#A07840',
        ink: '#1C1208',
        'ink-light': '#3D2910',
        'ink-faded': '#6B4E2A',
        pitch: '#4A6741',
        'pitch-dark': '#2D4228',
        'pitch-light': '#5A7A50',
        gold: '#D4A800',
        'pos-gk': '#B8860B',
        'pos-def': '#1E3A5F',
        'pos-mid': '#2D5A27',
        'pos-att': '#8B1A1A',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Roboto Slab"', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '3px 3px 0 0 rgba(28, 18, 8, 0.3)',
        'card-lg': '5px 5px 0 0 rgba(28, 18, 8, 0.3)',
        paper: '2px 2px 8px rgba(28, 18, 8, 0.2)',
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
} satisfies Config
