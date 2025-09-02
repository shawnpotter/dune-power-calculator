import Calculator from '@/components/calculator/Calculator'
import Footer from '@/components/Footer'
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
			<main className='flex-1 w-full max-w-none mx-auto p-4 xl:p-4'>
				<header className='mb-4'>
					<h1 className='text-2xl font-semibold text-center text-foreground'>
						Dune: Awakening Base Power Calculator
					</h1>
					<p className='sr-only'>
						Calculate power requirements, fuel consumption, and raw materials
						for your Dune base
					</p>
				</header>
				<Calculator />
			</main>
			<Footer />
		</div>
	)
}
