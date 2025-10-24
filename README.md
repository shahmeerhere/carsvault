# CarsVault - Premium Car Marketplace

A modern, responsive car marketplace built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🚗 Premium vehicle listings with detailed specifications
- 🔍 Advanced search and filtering capabilities
- 📊 Car comparison tools
- 💎 Modern, glass-morphism UI design
- 📱 Fully responsive design
- ⚡ Built with Next.js 14 App Router
- 🎨 Styled with Tailwind CSS and custom animations
- 🔧 TypeScript for type safety

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React Query (TanStack Query)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── not-found.tsx      # 404 page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Navigation.tsx    # Navigation component
│   ├── Hero.tsx          # Hero section
│   ├── FeaturedCars.tsx  # Featured cars section
│   ├── Features.tsx      # Features section
│   └── Footer.tsx        # Footer component
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── ...config files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

The project uses CSS custom properties for theming. You can customize colors and gradients by modifying the CSS variables in `app/globals.css`.

## License

This project is MIT licensed.

