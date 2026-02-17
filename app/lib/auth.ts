/**
 * Better Auth Configuration
 * Multi-tenant SaaS with organization-based RBAC
 */

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { organization } from "better-auth/plugins";
import { prisma } from "@/app/lib/prisma";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),

	baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
	basePath: "/api/auth",

	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // 5 minutes
		},
	},
	trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:3000"],
	secret: process.env.BETTER_AUTH_SECRET,

	// Email/password authentication
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false, // Set to true in production with email service
	},

	// Organization plugin for multi-tenancy
	plugins: [
		organization({
			async sendInvitationEmail(data) {
				// TODO: Implement email sending in future
				console.log("Invitation email:", data.email);
			},
		}),
		nextCookies(), // Must be last plugin - automatically sets cookies in server actions
	],
});
