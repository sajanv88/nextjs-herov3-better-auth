/**
 * Better Auth Configuration
 * Multi-tenant dental compliance SaaS with organization-based RBAC
 */

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { organization } from "better-auth/plugins";
import { prisma } from "@/app/lib/prisma";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),

	trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:3000"],
	secret: process.env.BETTER_AUTH_SECRET,

	// Email/password authentication
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false, // Set to true in production with email service
	},

	// Social providers
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID || "",
			clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
		},
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		},
	},

	// Organization plugin for multi-tenancy
	plugins: [
		organization({
			// Auto-create Practice when Organization is created
			async sendInvitationEmail(data) {
				// TODO: Implement email sending in Phase 3
				console.log("Invitation email:", data.email);
			},
		}),
	],
});
