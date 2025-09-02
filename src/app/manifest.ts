import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dune Base Calculator',
    short_name: 'Dune Calc',
    description: 'Calculate power requirements, fuel consumption, and raw materials for your Dune base.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#8B5CF6',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
    categories: ['games', 'utilities', 'productivity'],
    lang: 'en',
    orientation: 'portrait-primary',
  }
}
