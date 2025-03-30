/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		remotePatterns: [{ hostname: "cdn.shopify.com" }],
	},
	experimental: {
		authInterrupts: true,
	},
};

export default nextConfig;
