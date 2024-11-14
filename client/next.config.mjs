/** @type {import('next').NextConfig} */
/*
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["localhost", "flowbite.com"],
	},
};

export default nextConfig;
*/

const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["localhost", "flowbite.com"],
	},
	async headers() {
		return [
			{
				source: "/api/:path*",
				headers: [
					{
						key: "Access-Control-Allow-Origin",
						value: "http://localhost:3000",
					},
					{ key: "Access-Control-Allow-Credentials", value: "true" },
					{
						key: "Access-Control-Allow-Headers",
						value: "Content-Type",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
