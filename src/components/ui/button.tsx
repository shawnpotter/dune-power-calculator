import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default:
					'bg-gradient-primary-hover text-primary-foreground shadow-sm shadow-black border-0',
				destructive:
					'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm shadow-black hover:from-red-600 hover:to-red-700 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 border-0',
				outline:
					'border bg-gradient-secondary-hover hover:text-accent-foreground shadow-xs shadow-black',
				secondary:
					'bg-gradient-secondary-hover text-secondary-foreground shadow-xs shadow-black border-0',
				ghost:
					'hover:bg-gradient-secondary hover:text-accent-foreground border-0',
				link: 'text-primary underline-offset-4 hover:underline bg-transparent shadow-none border-0',
			},
			size: {
				default: 'h-10 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-11 rounded-lg px-6 has-[>svg]:px-4',
				icon: 'size-10 rounded-lg',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
	}) {
	const Comp = asChild ? Slot : 'button'

	return (
		<Comp
			data-slot='button'
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}

export { Button, buttonVariants }
