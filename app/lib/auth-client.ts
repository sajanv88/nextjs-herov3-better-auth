import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    trustedOrigins: [process.env.NEXT_PUBLIC_BASE_URL!, process.env.VERCEL_URL!],
    baseURL: process.env.NEXT_PUBLIC_BASE_URL! || "http://localhost:3000",
})

