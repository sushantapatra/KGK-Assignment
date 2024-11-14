/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["localhost", "flowbite.com", "res.cloudinary.com"],
	},
};

module.exports = nextConfig;
