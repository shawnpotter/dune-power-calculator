'use client'

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
		<div className='w-full max-w-7xl mx-auto'>
			<div className='grid grid-cols-1 xl:grid-cols-4 gap-3 min-h-[600px] xl:grid-rows-1'>
				{/* Configuration & Generators Section */}
				<div className='space-y-3 xl:w-full xl:max-w-none min-w-0'>
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
				<div className='space-y-6 xl:w-full xl:max-w-none min-w-0'>
					<FuelRequirementsSection
						results={results}
						refineryType={refineryType}
					/>
				</div>

				{/* Materials Breakdown Section */}
				<div className='space-y-6 xl:w-full xl:max-w-none min-w-0'>
					<MaterialsBreakdownSection
						results={results}
						refineryType={refineryType}
					/>
				</div>

				{/* Total Raw Materials Summary Section */}
				<div className='space-y-6 xl:w-full xl:max-w-none min-w-0'>
					<RawMaterialsSummarySection results={results} />
				</div>
			</div>
		</div>
	)
}
