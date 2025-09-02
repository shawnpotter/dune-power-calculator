import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { StructuredData } from '@/components/StructuredData'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: {
		default: 'Dune Power Calculator - Resource Planning',
		template: '%s | Dune Power Calculator',
	},
	description:
		'Calculate power requirements, fuel consumption, and raw materials for your Dune base. Optimize production and resource management with this calculator.',
	keywords: [
		'Dune',
		'base calculator',
		'power management',
		'fuel consumption',
		'resource planning',
		'Dune game',
		'materials calculator',
		'generator calculator',
		'refinery calculator',
		'Dune Awakening',
	],
	authors: [{ name: 'spotter_dev' }],
	creator: 'Dune Power Calculator',
	publisher: 'Dune Power Calculator',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
	),
	alternates: {
		canonical: '/',
	},
	openGraph: {
		title: 'Dune Power Calculator - Resource Planning',
		description:
			'Calculate power requirements, fuel consumption, and raw materials for your Dune base. Optimize production and resource management.',
		url: '/',
		siteName: 'Dune Base Calculator',
		type: 'website',
		locale: 'en_US',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Dune Power Calculator - Resource Planning',
		description:
			'Calculate power requirements, fuel consumption, and raw materials for your Dune base.',
		creator: '@spotter_dev',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<head>
				<StructuredData />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
