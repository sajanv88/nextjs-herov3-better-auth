/**
 * Role-Based Access Control (RBAC) Middleware
 * Enforces multi-tenant isolation and role-based permissions
 */

import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { headers } from "next/headers";

/**
 * Role definitions for dental compliance system
 */
export const Roles = {
	OWNER: "owner", // Practice owner - full access including billing
	MANAGER: "manager", // Practice manager - compliance oversight, no billing
	NURSE: "nurse", // Dental nurse - limited access, task completion
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

/**
 * Require authentication and specific role(s)
 * Returns authenticated user info with their practice ID
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
		throw new Error("No active organization - Please select a practice");
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
		throw new Error(
			`Forbidden - Requires one of: ${allowedRoles.join(", ")}`,
		);
	}

	// Get practice ID for multi-tenant filtering
	const practice = await prisma.practice.findUnique({
		where: { organizationId: activeOrgId },
		select: { id: true, countryCode: true },
	});

	if (!practice) {
		throw new Error("Practice not found for organization");
	}

	return {
		user: session.user,
		role: member.role as Role,
		practiceId: practice.id,
		countryCode: practice.countryCode,
		organizationId: activeOrgId,
	};
}

/**
 * Permission helpers for common access patterns
 */
export const can = {
	// Owners can manage billing and delete practice
	manageBilling: (role: Role) => role === Roles.OWNER,

	// Owners and managers can manage staff
	manageStaff: (role: Role) =>
		role === Roles.OWNER || role === Roles.MANAGER,

	// Owners and managers can manage tasks
	manageTasks: (role: Role) =>
		role === Roles.OWNER || role === Roles.MANAGER,

	// All roles can complete tasks (but nurses only their assigned ones)
	completeTasks: (role: Role) => true,

	// Owners and managers can verify certificates
	verifyCertificates: (role: Role) =>
		role === Roles.OWNER || role === Roles.MANAGER,

	// All roles can upload certificates
	uploadCertificates: (role: Role) => true,

	// Owners and managers can manage policies
	managePolicies: (role: Role) =>
		role === Roles.OWNER || role === Roles.MANAGER,

	// Owners and managers can view audit logs
	viewAuditLogs: (role: Role) =>
		role === Roles.OWNER || role === Roles.MANAGER,

	// Only owners can manage cron schedules
	manageCron: (role: Role) => role === Roles.OWNER,
};
