# Dune Base Calculator

A comprehensive calculator for managing power requirements, fuel consumption, and raw materials in your Dune base. Optimize spice production and resource management with real-time calculations.

## Features

- **Generator Management**: Calculate power requirements for various generator types
- **Fuel Consumption**: Track fuel needs and production efficiency
- **Raw Materials Breakdown**: Recursive calculation of all required base materials
- **Refinery Compatibility**: Handle different refinery types and their constraints
- **Dark/Light Theme**: Adaptive UI with system preference detection

## Getting Started

First, copy the environment variables:

```bash
cp .env.example .env.local
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## SEO Features

This project includes comprehensive SEO optimization:

- **Structured Data**: JSON-LD markup for better search engine understanding
- **Meta Tags**: Open Graph and Twitter Card support
- **Sitemap**: Automatically generated XML sitemap
- **Robots.txt**: Search engine crawling instructions
- **PWA Manifest**: Progressive Web App capabilities
- **Performance**: Optimized with Next.js 15 and Turbopack

## Deployment

### Environment Variables

Before deploying, make sure to set:

- `NEXT_PUBLIC_SITE_URL`: Your production domain (e.g., `https://yourdomain.com`)

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Themes**: next-themes
- **Build Tool**: Turbopack
