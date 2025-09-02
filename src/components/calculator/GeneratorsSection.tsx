import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
}: GeneratorsSectionProps) {
	return (
		<Card className='xl:flex-1 xl:flex xl:flex-col xl:min-h-0'>
			<CardHeader>
				<CardTitle className='text-lg'>Generators</CardTitle>
			</CardHeader>
			<CardContent className='xl:flex-1 xl:min-h-0 xl:overflow-auto'>
				<div className='space-y-3 xl:h-full xl:overflow-auto'>
					{generators.map((gen) => {
						const isCompatible = isGeneratorCompatible(gen)

						return (
							<div
								key={gen.id}
								className={`p-3 border rounded-lg transition-colors ${
									isCompatible
										? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
										: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900 opacity-60'
								}`}
							>
								<div className='space-y-2'>
									<div>
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
											className={`text-xs break-words ${
												isCompatible
													? 'text-gray-600 dark:text-gray-400'
													: 'text-red-500 dark:text-red-500'
											}`}
										>
											{gen.powerOutput}W • Fuel:{' '}
											{typedResources[gen.fuelType] || gen.fuelType}
										</p>
										{!isCompatible && (
											<p className='text-xs text-red-600 dark:text-red-400 font-medium'>
												Needs Medium Chemical Refinery
											</p>
										)}
									</div>
									<div className='flex items-center gap-2'>
										<Label
											htmlFor={`gen-${gen.id}`}
											className='text-xs'
										>
											Quantity:
										</Label>
										<Input
											id={`gen-${gen.id}`}
											type='number'
											min='0'
											value={generatorQuantities[gen.id]}
											onChange={(e) =>
												onQuantityChange(gen.id, parseInt(e.target.value, 10))
											}
											disabled={!isCompatible}
											className={`w-20 h-8 text-sm ${
												!isCompatible ? 'opacity-50 cursor-not-allowed' : ''
											}`}
										/>
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
