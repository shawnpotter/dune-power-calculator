import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import generators from '@/data/generators.json'
import resources from '@/data/resources.json'

const typedResources: Record<string, string> = resources

interface GeneratorsSectionProps {
	generatorQuantities: Record<string, number>
	onQuantityChange: (id: string, quantity: number) => void
	isGeneratorCompatible: (generator: { fuelType: string }) => boolean
}

export default function GeneratorsSection({
	generatorQuantities,
	onQuantityChange,
	isGeneratorCompatible,
}: Readonly<GeneratorsSectionProps>) {
	const handleIncrement = (id: string) => {
		const currentValue = generatorQuantities[id] || 0
		onQuantityChange(id, currentValue + 1)
	}

	const handleDecrement = (id: string) => {
		const currentValue = generatorQuantities[id] || 0
		if (currentValue > 0) {
			onQuantityChange(id, currentValue - 1)
		}
	}

	return (
		<Card className='xl:flex-1 xl:flex xl:flex-col xl:min-h-0'>
			<CardHeader>
				<CardTitle className='text-lg'>Generators</CardTitle>
			</CardHeader>
			<CardContent className='xl:flex-1 xl:min-h-0 xl:overflow-auto'>
				<div className='space-y-3 xl:h-full xl:overflow-auto'>
					{generators.map((gen) => {
						const isCompatible = isGeneratorCompatible(gen)
						const quantity = generatorQuantities[gen.id] || 0

						return (
							<div
								key={gen.id}
								className={`p-4 border rounded-lg transition-colors ${
									isCompatible
										? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
										: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900 opacity-60'
								}`}
							>
								<div className='flex items-center justify-between'>
									{/* Left side - Generator info */}
									<div className='flex-1 min-w-0'>
										<h4
											className={`font-medium text-sm break-words ${
												isCompatible
													? 'text-gray-900 dark:text-gray-100'
													: 'text-red-600 dark:text-red-400'
											}`}
										>
											{gen.name}
										</h4>
										<p
											className={`text-xs break-words mt-1 ${
												isCompatible
													? 'text-gray-600 dark:text-gray-400'
													: 'text-red-500 dark:text-red-500'
											}`}
										>
											{gen.powerOutput}W
										</p>
										{!isCompatible && (
											<p className='text-xs text-red-600 dark:text-red-400 font-medium mt-1'>
												Needs Medium Chemical Refinery
											</p>
										)}
									</div>

									{/* Right side - Quantity controls */}
									<div className='flex items-center gap-3 ml-4'>
										<div className='min-w-[2.5rem] text-center'>
											<span
												className={`text-lg font-medium ${
													isCompatible
														? 'text-gray-900 dark:text-gray-100'
														: 'text-red-600 dark:text-red-400'
												}`}
											>
												{quantity}
											</span>
										</div>

										<div className='flex flex-col gap-1'>
											<Button
												variant='outline'
												size='icon'
												className='h-6 w-6'
												onClick={() => handleIncrement(gen.id)}
												disabled={!isCompatible}
											>
												<Plus className='h-3 w-3' />
											</Button>

											<Button
												variant='outline'
												size='icon'
												className='h-6 w-6'
												onClick={() => handleDecrement(gen.id)}
												disabled={!isCompatible || quantity <= 0}
											>
												<Minus className='h-3 w-3' />
											</Button>
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</CardContent>
		</Card>
	)
}
