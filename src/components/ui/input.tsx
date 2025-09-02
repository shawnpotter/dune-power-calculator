import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
	return (
		<input
			type={type}
			data-slot='input'
			className={cn(
				'file:text-foreground placeholder:text-muted-foreground selection:bg-gradient-primary selection:text-primary-foreground bg-gradient-secondary flex h-10 w-full min-w-0 rounded-lg border border-border/50 px-4 py-2 text-base shadow-xs transition-all duration-300 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				'focus-visible:border focus-visible:ring-ring/50 focus-visible:ring-2 focus-visible:shadow-md shadow-black focus-visible:scale-[1.02]',
				'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
				className
			)}
			{...props}
		/>
	)
}

export { Input }
