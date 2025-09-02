import Calculator from '@/components/calculator/Calculator'
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
		<div className='font-sans h-screen w-full p-4 xl:p-4'>
			<main className='w-full h-full max-w-none mx-auto'>
				<header className='sr-only'>
					<h1>Dune Base Calculator</h1>
					<p>
						Calculate power requirements, fuel consumption, and raw materials
						for your Dune base
					</p>
				</header>
				<Calculator />
			</main>
		</div>
	)
}
