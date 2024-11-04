/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	webpack: (config) => {
		config.resolve.alias = {
			...config.resolve.alias,
			'mapbox-gl': 'mapbox-gl/dist/mapbox-gl.js',
		};
		return config;
	},
	images: {
		domains: ['maps.googleapis.com'],
	},
};

module.exports = nextConfig;
