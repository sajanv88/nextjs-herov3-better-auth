"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

type LoginActionState = {
	error?: string;
	email?: string;
} | null;

type RegisterActionState = {
	error?: string;
	name?: string;
	email?: string;
	organizationName?: string;
} | null;

export async function loginAction(
	_prevState: LoginActionState,
	formData: FormData,
): Promise<LoginActionState> {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	if (!email || !password) {
		return {
			error: "Email and password are required",
			email,
		};
	}

	try {
		// Use Better Auth server-side sign in
		await auth.api.signInEmail({
			body: {
				email,
				password,
			},
			headers: await headers(),
		});
	} catch (error) {
		console.error("Login error:", error);
		return {
			error:
				error instanceof Error
					? error.message
					: "Failed to sign in. Please check your credentials.",
			email,
		};
	}

	revalidatePath("/dashboard");
	redirect("/dashboard");
}

export async function registerAction(
	_prevState: RegisterActionState,
	formData: FormData,
): Promise<RegisterActionState> {
	const name = formData.get("name") as string;
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const confirmPassword = formData.get("confirmPassword") as string;
	const organizationName = formData.get("organizationName") as string;

	// Validation
	if (!name || !email || !password || !confirmPassword || !organizationName) {
		return {
			error: "All fields are required",
			name,
			email,
			organizationName,
		};
	}

	if (password !== confirmPassword) {
		return {
			error: "Passwords do not match",
			name,
			email,
			organizationName,
		};
	}

	if (password.length < 8) {
		return {
			error: "Password must be at least 8 characters",
			name,
			email,
			organizationName,
		};
	}

	try {
		// Step 1: Register user with Better Auth
		const signUpResult = await auth.api.signUpEmail({
			body: {
				email,
				password,
				name,
			},
			headers: await headers(),
		});

		if (!signUpResult?.user) {
			throw new Error("Failed to create account");
		}

		// Get the user ID from signup result
		const userId = signUpResult.user.id;

		// Step 2: Create organization directly using Prisma
		const orgSlug = organizationName
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-|-$/g, "");

		const organization = await prisma.organization.create({
			data: {
				name: organizationName,
				slug: orgSlug,
				members: {
					create: {
						userId: userId,
						role: "owner",
					},
				},
			},
		});

		console.log("Organization created:", organization);

		// Step 3: Sign in the user to establish session
		await auth.api.signInEmail({
			body: {
				email,
				password,
			},
			headers: await headers(),
		});
	} catch (error) {
		console.error("Registration error:", error);
		return {
			error:
				error instanceof Error
					? error.message
					: "Failed to create account. Please try again.",
			name,
			email,
			organizationName,
		};
	}

	revalidatePath("/dashboard");
	redirect("/dashboard");
}

export const isAuthenticated = async () => {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});
		console.log("Auth check session:", session);
		return !!session?.user;
	} catch (error) {
		console.error("Auth check error:", error);
		return false;
	}
};
