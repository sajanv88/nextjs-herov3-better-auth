import type { NextConfig } from "next";

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			BETTER_AUTH_SECRET: string;
			BETTER_AUTH_URL: string;
		}
	}
}
const nextConfig: NextConfig = {
	output: "standalone",
	experimental: {
		typedEnv: true,
	},
};

export default nextConfig;
