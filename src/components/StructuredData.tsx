interface StructuredDataConfig {
  title?: string
  description?: string
  url?: string
}

export function StructuredData({
  title = 'Dune Base Calculator',
  description = 'Calculate power requirements, fuel consumption, and raw materials for your Dune base.',
  url = '/'
}: StructuredDataConfig = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    description: description,
    url: `${baseUrl}${url}`,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    creator: {
      '@type': 'Organization',
      name: 'Dune Base Calculator'
    },
    keywords: 'Dune, base calculator, spice production, power management, fuel consumption, resource planning',
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
