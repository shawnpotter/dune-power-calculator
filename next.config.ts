import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	// Security headers for production
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Referrer-Policy',
						value: 'strict-origin-when-cross-origin',
					},
					{
						key: 'Permissions-Policy',
						value: 'camera=(), microphone=(), geolocation=()',
					},
					{
						key: 'Content-Security-Policy',
						value: [
							"default-src 'self'",
							"script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Next.js requires unsafe-inline for development
							"style-src 'self' 'unsafe-inline'", // Required for Tailwind
							"img-src 'self' data: blob:",
							"font-src 'self' data:",
							"connect-src 'self'",
							"frame-ancestors 'none'",
						].join('; '),
					},
				],
			},
		]
	},
	// Disable x-powered-by header
	poweredByHeader: false,
}

export default nextConfig
