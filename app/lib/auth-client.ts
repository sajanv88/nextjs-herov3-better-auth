import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
	trustedOrigins: [process.env.BETTER_AUTH_URL],
	baseURL: process.env.BETTER_AUTH_URL,
});
