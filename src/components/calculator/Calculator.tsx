'use client'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useCalculator } from '@/hooks/useCalculator'
import ConfigurationSection from './ConfigurationSection'
import GeneratorsSection from './GeneratorsSection'
import FuelRequirementsSection from './FuelRequirementsSection'
import MaterialsBreakdownSection from './MaterialsBreakdownSection'
import RawMaterialsSummarySection from './RawMaterialsSummarySection'

export default function Calculator() {
	const {
		timeToPower,
		setTimeToPower,
		results,
		refineryType,
		generatorQuantities,
		handleQuantityChange,
		isGeneratorCompatible,
		handleRefineryChange,
	} = useCalculator()

	return (
		<div className='w-full max-w-7xl mx-auto space-y-4 xl:h-full xl:flex xl:flex-col'>
			<Card className='xl:flex-shrink-0'>
				<CardHeader className='xl:py-4'>
					<CardTitle className='text-2xl text-center'>
						Dune: Awakening Base Power Calculator
					</CardTitle>
				</CardHeader>
			</Card>

			<div className='grid grid-cols-1 xl:grid-cols-4 gap-3 min-h-[600px] xl:grid-rows-1 xl:flex-1 xl:min-h-0 xl:w-full'>
				{/* Configuration & Generators Section */}
				<div className='space-y-3 xl:w-full xl:max-w-none min-w-0 xl:flex xl:flex-col xl:h-full xl:overflow-hidden'>
					<ConfigurationSection
						refineryType={refineryType}
						timeToPower={timeToPower}
						onRefineryChange={handleRefineryChange}
						onTimeToPowerChange={setTimeToPower}
					/>
					<GeneratorsSection
						generatorQuantities={generatorQuantities}
						onQuantityChange={handleQuantityChange}
						isGeneratorCompatible={isGeneratorCompatible}
					/>
				</div>

				{/* Fuel Requirements Section */}
				<div className='space-y-6 h-full xl:w-full xl:max-w-none min-w-0 xl:overflow-hidden'>
					<FuelRequirementsSection
						results={results}
						refineryType={refineryType}
					/>
				</div>

				{/* Materials Breakdown Section */}
				<div className='space-y-6 h-full xl:w-full xl:max-w-none min-w-0 xl:overflow-hidden'>
					<MaterialsBreakdownSection
						results={results}
						refineryType={refineryType}
					/>
				</div>

				{/* Total Raw Materials Summary Section */}
				<div className='space-y-6 h-full xl:w-full xl:max-w-none min-w-0 xl:overflow-hidden'>
					<RawMaterialsSummarySection results={results} />
				</div>
			</div>
		</div>
	)
}
