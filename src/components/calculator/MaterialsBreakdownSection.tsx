import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalculatorResults } from '@/hooks/useCalculator'
import resources from '@/data/resources.json'
import craftingCosts from '@/data/craftingCosts.json'

const typedResources: Record<string, string> = resources
const typedCraftingCosts: Record<
	string,
	Record<string, { rawResources?: Record<string, number>; yield: number }>
> = craftingCosts

interface MaterialsBreakdownSectionProps {
	results: CalculatorResults
	refineryType: string
}

export default function MaterialsBreakdownSection({
	results,
	refineryType,
}: MaterialsBreakdownSectionProps) {
	return (
		<Card className='h-full flex flex-col'>
			<CardHeader>
				<CardTitle className='text-lg'>Materials Breakdown by Fuel</CardTitle>
			</CardHeader>
			<CardContent className='flex-1 min-h-0 xl:overflow-auto'>
				{Object.keys(results.fuelNeeded).length > 0 ? (
					<div className='space-y-4 xl:h-full xl:overflow-auto'>
						{Object.entries(results.fuelNeeded).map(
							([fuelType, neededAmount]) => {
								const craftedAmount =
									results.fuelToCraft[fuelType] || neededAmount
								const rawResources =
									typedCraftingCosts[refineryType]?.[fuelType]?.rawResources

								if (!rawResources) return null

								return (
									<div
										key={fuelType}
										className='space-y-2'
									>
										<h4 className='font-medium text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-1 break-words'>
											For {typedResources[fuelType] || fuelType}:
										</h4>
										<div className='space-y-2'>
											{Object.entries(rawResources).map(
												([rawResource, rawAmount]) => (
													<div
														key={rawResource}
														className='flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-sm'
													>
														<span className='text-gray-900 dark:text-gray-100 text-xs break-words'>
															{typedResources[rawResource] || rawResource}
														</span>
														<span className='font-medium text-gray-900 dark:text-gray-100 text-xs'>
															{(
																rawAmount *
																(craftedAmount /
																	typedCraftingCosts[refineryType][fuelType]
																		.yield)
															).toLocaleString()}
														</span>
													</div>
												)
											)}
										</div>
									</div>
								)
							}
						)}
					</div>
				) : (
					<div className='flex items-center justify-center h-full min-h-[300px]'>
						<div className='text-gray-500 dark:text-gray-400 text-center'>
							<h3 className='text-lg font-medium mb-2 text-gray-700 dark:text-gray-300'>
								No Materials Required
							</h3>
							<p className='text-sm'>
								Configure generators to see materials breakdown
							</p>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
