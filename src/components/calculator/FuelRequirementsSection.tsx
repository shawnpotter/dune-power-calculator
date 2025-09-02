import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalculatorResults } from '@/hooks/useCalculator'
import resources from '@/data/resources.json'
import craftingCosts from '@/data/craftingCosts.json'

const typedResources: Record<string, string> = resources
const typedCraftingCosts: Record<
	string,
	Record<string, { rawResources?: Record<string, number>; yield: number }>
> = craftingCosts

interface FuelRequirementsSectionProps {
	results: CalculatorResults
	refineryType: string
}

export default function FuelRequirementsSection({
	results,
	refineryType,
}: FuelRequirementsSectionProps) {
	return (
		<Card className='h-full flex flex-col'>
			<CardHeader>
				<CardTitle className='text-lg'>Fuel Requirements</CardTitle>
			</CardHeader>
			<CardContent className='flex-1 min-h-0 xl:overflow-auto'>
				{Object.keys(results.fuelNeeded).length > 0 ? (
					<div className='space-y-3 xl:h-full xl:overflow-auto'>
						{Object.entries(results.fuelNeeded).map(
							([fuelType, neededAmount]) => {
								const craftedAmount =
									results.fuelToCraft[fuelType] || neededAmount
								const yieldValue =
									typedCraftingCosts[refineryType]?.[fuelType]?.yield || 1
								const batchesNeeded = Math.ceil(neededAmount / yieldValue)

								return (
									<div
										key={fuelType}
										className='p-3 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-950'
									>
										<div className='space-y-2'>
											<h4 className='font-medium text-sm text-gray-900 dark:text-gray-100 break-words'>
												{typedResources[fuelType] || fuelType}
											</h4>
											<div className='space-y-1 text-xs'>
												<div className='text-orange-600 dark:text-orange-400 font-medium'>
													{neededAmount.toLocaleString()} needed
												</div>
												{craftedAmount > neededAmount && (
													<div className='text-blue-600 dark:text-blue-400'>
														{craftedAmount.toLocaleString()} crafted
													</div>
												)}
												<div className='text-gray-500 dark:text-gray-400'>
													{batchesNeeded} batch{batchesNeeded !== 1 ? 'es' : ''}{' '}
													(yield: {yieldValue})
												</div>
											</div>
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
								No Fuel Required
							</h3>
							<p className='text-sm'>
								Configure generators to see fuel requirements
							</p>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
