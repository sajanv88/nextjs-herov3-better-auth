/**
 * Role-Based Access Control (RBAC) Middleware
 * Enforces multi-tenant isolation and role-based permissions
 */

import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

/**
 * Role definitions for multi-tenant system
 */
export const Roles = {
	OWNER: "owner", // Organization owner - full access
	MANAGER: "manager", // Manager - limited admin access
	MEMBER: "member", // Member - basic access
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

/**
 * Require authentication and specific role(s)
 * Returns authenticated user info with their organization ID
 */
export async function requireRole(allowedRoles: Role[]) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		throw new Error("Unauthorized - Please log in");
	}

	// Get user's active organization and role
	const activeOrgId = session.session.activeOrganizationId;

	if (!activeOrgId) {
		throw new Error("No active organization - Please select an organization");
	}

	// Get member record to check role
	const member = await prisma.member.findFirst({
		where: {
			userId: session.user.id,
			organizationId: activeOrgId,
		},
	});

	if (!member) {
		throw new Error("Not a member of this organization");
	}

	if (!allowedRoles.includes(member.role as Role)) {
		throw new Error(`Forbidden - Requires one of: ${allowedRoles.join(", ")}`);
	}

	return {
		user: session.user,
		role: member.role as Role,
		organizationId: activeOrgId,
	};
}

/**
 * Permission helpers for common access patterns
 */
export const can = {
	// Owners can manage organization settings
	manageOrganization: (role: Role) => role === Roles.OWNER,

	// Owners and managers can manage members
	manageMembers: (role: Role) => role === Roles.OWNER || role === Roles.MANAGER,

	// All roles have basic access
	basicAccess: (role: Role) => true,
};
