import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalculatorResults } from '@/hooks/useCalculator'
import resources from '@/data/resources.json'

const typedResources: Record<string, string> = resources

interface RawMaterialsSummarySectionProps {
	results: CalculatorResults
}

export default function RawMaterialsSummarySection({
	results,
}: RawMaterialsSummarySectionProps) {
	return (
		<Card className='h-full flex flex-col'>
			<CardHeader>
				<CardTitle className='text-lg'>Total Raw Materials Summary</CardTitle>
			</CardHeader>
			<CardContent className='flex-1 min-h-0 xl:overflow-auto'>
				{Object.keys(results.rawMaterials || {}).length > 0 ? (
					<div className='space-y-3 xl:h-full xl:overflow-auto'>
						{Object.entries(results.rawMaterials || {})
							.sort(([a], [b]) => {
								// Sort water first, then alphabetically
								if (a === 'water') return -1
								if (b === 'water') return 1
								return (typedResources[a] || a).localeCompare(
									typedResources[b] || b
								)
							})
							.map(([rawMaterial, amount]) => (
								<div
									key={rawMaterial}
									className={`p-3 border rounded-lg ${
										rawMaterial === 'water'
											? 'border-blue-300 dark:border-blue-700 bg-blue-100 dark:bg-blue-900'
											: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950'
									}`}
								>
									<div className='flex justify-between items-center'>
										<span className='font-medium text-sm text-gray-900 dark:text-gray-100 break-words'>
											{typedResources[rawMaterial] || rawMaterial}
										</span>
										<span
											className={`font-bold text-lg ${
												rawMaterial === 'water'
													? 'text-blue-700 dark:text-blue-300'
													: 'text-green-700 dark:text-green-300'
											}`}
										>
											{Math.ceil(amount).toLocaleString()}
										</span>
									</div>
								</div>
							))}
					</div>
				) : (
					<div className='flex items-center justify-center h-full min-h-[300px]'>
						<div className='text-gray-500 dark:text-gray-400 text-center'>
							<h3 className='text-lg font-medium mb-2 text-gray-700 dark:text-gray-300'>
								No Raw Materials Required
							</h3>
							<p className='text-sm'>
								Configure generators to see total raw material requirements
							</p>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
