import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

interface ConfigurationSectionProps {
	refineryType: string
	timeToPower: number
	onRefineryChange: (value: string) => void
	onTimeToPowerChange: (value: number) => void
}

export default function ConfigurationSection({
	refineryType,
	timeToPower,
	onRefineryChange,
	onTimeToPowerChange,
}: Readonly<ConfigurationSectionProps>) {
	return (
		<Card className='xl:flex-shrink-0'>
			<CardHeader>
				<CardTitle className='text-lg'>Configuration</CardTitle>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div>
					<Label
						htmlFor='refinery'
						className='text-sm font-medium'
					>
						Refinery Type
					</Label>
					<Select
						value={refineryType}
						onValueChange={onRefineryChange}
					>
						<SelectTrigger className='mt-1'>
							<SelectValue placeholder='Select a refinery type' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='SmallChemicalRefinery'>
								Small Chemical Refinery
							</SelectItem>
							<SelectItem value='MediumChemicalRefinery'>
								Medium Chemical Refinery
							</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div>
					<Label
						htmlFor='timeToPower'
						className='text-sm font-medium'
					>
						Time to Power: {timeToPower} Day{timeToPower !== 1 ? 's' : ''}
					</Label>
					<Slider
						value={[timeToPower]}
						min={1}
						max={20}
						onValueChange={(values) => onTimeToPowerChange(values[0])}
						className='mt-2'
					/>
					<div className='flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1'>
						<span>1 day</span>
						<span>20 days</span>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
