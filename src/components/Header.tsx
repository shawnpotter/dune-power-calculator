import ThemeToggle from '@/components/ui/ThemeToggle'

export default function Header() {
	return (
		<header className='border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='container mx-auto px-4 py-4'>
				<div className='flex items-center justify-between'>
					<h1 className='text-4xl font-normal font-genos'>
						DUNE: Awakening &mdash; Base Power Calculator
					</h1>
					<ThemeToggle />
				</div>
			</div>
		</header>
	)
}
