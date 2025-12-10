import { betterAuth } from "better-auth";


export const auth = betterAuth({
    trustedOrigins: [process.env.NEXT_PUBLIC_BASE_URL!, process.env.VERCEL_URL!],
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        },
    },
});