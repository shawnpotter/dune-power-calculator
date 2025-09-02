import Calculator from '@/components/calculator/Calculator'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Dune Power Calculator - Resource Planning',
	description:
		'Plan your Dune base with our comprehensive calculator. Calculate generator power requirements, fuel consumption, and raw material costs for optimal spice production and base management.',
	openGraph: {
		title: 'Dune Power Calculator - Resource Planning',
		description:
			'Plan your Dune base with our comprehensive calculator. Calculate generator power requirements, fuel consumption, and raw material costs.',
		type: 'website',
	},
}

export default function Home() {
	return (
		<div className='font-sans min-h-screen w-full flex flex-col'>
			<Header />
			<main className='flex-1 w-full max-w-none mx-auto p-4 xl:p-4'>
				<p className='sr-only'>
					Calculate power requirements, fuel consumption, and raw materials for
					your Dune base
				</p>
				<Calculator />
			</main>
			<Footer />
		</div>
	)
}
