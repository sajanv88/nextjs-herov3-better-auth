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

	// Organization plugin for multi-tenancy
	plugins: [
		organization({
			async sendInvitationEmail(data) {
				// TODO: Implement email sending in Phase 3
				console.log("Invitation email:", data.email);
			},
			organizationHooks: {
				// Auto-create Practice when Organization is created
				async afterCreateOrganization({ organization }) {
					await prisma.practice.create({
						data: {
							organizationId: organization.id,
							countryCode: "GB", // Default to UK, can be updated later
							subscriptionTier: "starter",
						},
					});
					console.log(
						`Practice created for organization: ${organization.name}`,
					);
				},
			},
		}),
	],
});
