import { useCallback, useEffect, useState } from 'react'
import generators from '@/data/generators.json'
import craftingCosts from '@/data/craftingCosts.json'

const typedCraftingCosts: Record<
	string,
	Record<string, { rawResources?: Record<string, number>; yield: number }>
> = craftingCosts

export interface CalculatorResults {
	fuelNeeded: Record<string, number>
	fuelToCraft: Record<string, number>
	rawMaterials: Record<string, number>
}

export function useCalculator() {
	const [timeToPower, setTimeToPower] = useState(1)
	const [results, setResults] = useState<CalculatorResults>({
		fuelNeeded: {},
		fuelToCraft: {},
		rawMaterials: {},
	})
	const [refineryType, setRefineryType] = useState('SmallChemicalRefinery')
	const [generatorQuantities, setGeneratorQuantities] = useState(
		generators.reduce((acc, gen) => {
			acc[gen.id] = 0
			return acc
		}, {} as Record<string, number>)
	)

	const handleQuantityChange = (id: string, quantity: number) => {
		setGeneratorQuantities((prev) => ({
			...prev,
			[id]: isNaN(quantity) || quantity < 0 ? 0 : quantity,
		}))
	}

	// Check if a generator is compatible with the current refinery type
	const isGeneratorCompatible = useCallback(
		(generator: { fuelType: string }) => {
			// If the generator uses spice-fuel-cell, check if the current refinery can craft it
			if (generator.fuelType === 'spice-fuel-cell') {
				return (
					typedCraftingCosts[refineryType]?.['spice-fuel-cell'] !== undefined
				)
			}
			// All other generators are compatible
			return true
		},
		[refineryType]
	)

	// Handle refinery type change - reset incompatible generators
	const handleRefineryChange = useCallback((newRefineryType: string) => {
		setRefineryType(newRefineryType)

		// Reset quantities for generators that are no longer compatible
		setGeneratorQuantities((prev) => {
			const updated = { ...prev }
			generators.forEach((gen) => {
				if (
					gen.fuelType === 'spice-fuel-cell' &&
					newRefineryType === 'SmallChemicalRefinery'
				) {
					updated[gen.id] = 0
				}
			})
			return updated
		})
	}, [])

	// Helper function to recursively break down materials into raw materials
	const getRecursiveRawMaterials = useCallback(
		(materialType: string, amount: number): Record<string, number> => {
			const rawMaterials: Record<string, number> = {}

			// Check if this material has a crafting recipe
			const recipe = typedCraftingCosts[refineryType]?.[materialType]

			if (recipe?.rawResources) {
				// Calculate batches needed for this amount
				const batchesNeeded = Math.ceil(amount / recipe.yield)

				// For each raw material in the recipe
				Object.entries(recipe.rawResources).forEach(
					([rawMaterial, rawAmount]) => {
						const totalNeeded = rawAmount * batchesNeeded

						// If this raw material also has a recipe, recurse
						const subMaterials = getRecursiveRawMaterials(
							rawMaterial,
							totalNeeded
						)

						// Add sub-materials to our collection
						Object.entries(subMaterials).forEach(([subMaterial, subAmount]) => {
							rawMaterials[subMaterial] =
								(rawMaterials[subMaterial] || 0) + subAmount
						})

						// If no sub-materials found, this is a true raw material
						if (Object.keys(subMaterials).length === 0) {
							rawMaterials[rawMaterial] =
								(rawMaterials[rawMaterial] || 0) + totalNeeded
						}
					}
				)
			} else {
				// No recipe found, this is a raw material itself
				rawMaterials[materialType] = (rawMaterials[materialType] || 0) + amount
			}

			return rawMaterials
		},
		[refineryType]
	)

	// Helper function to process raw materials and add to collections
	const processRawMaterial = useCallback(
		(
			rawResource: string,
			totalNeeded: number,
			fuelType: string,
			adjustedRawResources: Record<string, Record<string, number>>,
			totalRawMaterials: Record<string, number>
		) => {
			const recursiveMaterials = getRecursiveRawMaterials(
				rawResource,
				totalNeeded
			)

			if (Object.keys(recursiveMaterials).length > 0) {
				// This material breaks down into other materials
				Object.entries(recursiveMaterials).forEach(
					([trulyRawMaterial, trulyRawAmount]) => {
						if (!adjustedRawResources[trulyRawMaterial]) {
							adjustedRawResources[trulyRawMaterial] = {}
						}
						adjustedRawResources[trulyRawMaterial][fuelType] =
							(adjustedRawResources[trulyRawMaterial][fuelType] || 0) +
							trulyRawAmount

						// Add to total raw materials
						totalRawMaterials[trulyRawMaterial] =
							(totalRawMaterials[trulyRawMaterial] || 0) + trulyRawAmount
					}
				)
			} else {
				// This is already a raw material
				if (!adjustedRawResources[rawResource]) {
					adjustedRawResources[rawResource] = {}
				}
				adjustedRawResources[rawResource][fuelType] =
					(adjustedRawResources[rawResource][fuelType] || 0) + totalNeeded

				// Add to total raw materials
				totalRawMaterials[rawResource] =
					(totalRawMaterials[rawResource] || 0) + totalNeeded
			}
		},
		[getRecursiveRawMaterials]
	)

	const calculateResources = useCallback(() => {
		const fuelNeeded: Record<string, number> = {}
		const fuelToCraft: Record<string, number> = {}

		Object.entries(generatorQuantities).forEach(([id, quantity]) => {
			const generator = generators.find((g) => g.id === id)
			if (generator && quantity > 0) {
				const totalFuel =
					generator.fuelConsumptionRatePerHour * quantity * 24 * timeToPower
				if (fuelNeeded[generator.fuelType]) {
					fuelNeeded[generator.fuelType] += totalFuel
				} else {
					fuelNeeded[generator.fuelType] = totalFuel
				}
			}
		})

		// Calculate how much fuel actually needs to be crafted (accounting for yield)
		Object.entries(fuelNeeded).forEach(([fuelType, amount]) => {
			const yieldValue =
				typedCraftingCosts[refineryType]?.[fuelType]?.yield || 1
			// Calculate number of crafting batches needed (rounded up)
			const batchesNeeded = Math.ceil(amount / yieldValue)
			// Calculate actual amount that will be crafted
			fuelToCraft[fuelType] = batchesNeeded * yieldValue
		})

		const adjustedRawResources: Record<string, Record<string, number>> = {}
		const totalRawMaterials: Record<string, number> = {}

		Object.entries(fuelToCraft).forEach(([fuelType, craftedAmount]) => {
			const yieldValue =
				typedCraftingCosts[refineryType]?.[fuelType]?.yield || 1

			if (typedCraftingCosts[refineryType]?.[fuelType]?.rawResources) {
				// This fuel has a crafting recipe, process its raw materials
				Object.entries(
					typedCraftingCosts[refineryType][fuelType].rawResources
				).forEach(([rawResource, rawAmount]) => {
					const totalNeeded = rawAmount * (craftedAmount / yieldValue)
					processRawMaterial(
						rawResource,
						totalNeeded,
						fuelType,
						adjustedRawResources,
						totalRawMaterials
					)
				})
			} else {
				// This fuel doesn't have a crafting recipe, it's a raw material itself
				const recursiveMaterials = getRecursiveRawMaterials(
					fuelType,
					craftedAmount
				)

				if (Object.keys(recursiveMaterials).length > 0) {
					// Add the recursive materials to our totals
					Object.entries(recursiveMaterials).forEach(
						([rawMaterial, amount]) => {
							totalRawMaterials[rawMaterial] =
								(totalRawMaterials[rawMaterial] || 0) + amount
						}
					)
				} else {
					// This is already a raw material, add it directly
					totalRawMaterials[fuelType] =
						(totalRawMaterials[fuelType] || 0) + craftedAmount
				}
			}
		})

		// Set results to show both needed and crafted amounts, plus raw materials
		setResults({ fuelNeeded, fuelToCraft, rawMaterials: totalRawMaterials })
	}, [
		generatorQuantities,
		timeToPower,
		refineryType,
		processRawMaterial,
		getRecursiveRawMaterials,
	])

	useEffect(() => {
		calculateResources()
	}, [calculateResources])

	return {
		timeToPower,
		setTimeToPower,
		results,
		refineryType,
		generatorQuantities,
		handleQuantityChange,
		isGeneratorCompatible,
		handleRefineryChange,
	}
}
