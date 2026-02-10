"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";

type ActionState = {
	error?: string;
} | null;

export async function loginAction(
	_prevState: ActionState,
	formData: FormData,
): Promise<ActionState> {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	if (!email || !password) {
		return {
			error: "Email and password are required",
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

		redirect("/dashboard");
	} catch (error) {
		console.error("Login error:", error);
		return {
			error:
				error instanceof Error
					? error.message
					: "Failed to sign in. Please check your credentials.",
		};
	}
}

export async function registerAction(
	_prevState: ActionState,
	formData: FormData,
): Promise<ActionState> {
	const name = formData.get("name") as string;
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const confirmPassword = formData.get("confirmPassword") as string;
	const practiceName = formData.get("practiceName") as string;

	// Validation
	if (!name || !email || !password || !confirmPassword || !practiceName) {
		return {
			error: "All fields are required",
		};
	}

	if (password !== confirmPassword) {
		return {
			error: "Passwords do not match",
		};
	}

	if (password.length < 8) {
		return {
			error: "Password must be at least 8 characters",
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

		if (!signUpResult) {
			throw new Error("Failed to create account");
		}

		// Step 2: Create organization (practice)
		// Note: This requires the user to be authenticated first
		// We need to sign in the user after registration
		await auth.api.signInEmail({
			body: {
				email,
				password,
			},
			headers: await headers(),
		});

		// Now create the organization
		const orgResult = await auth.api.createOrganization({
			body: {
				name: practiceName,
				slug: practiceName.toLowerCase().replace(/\s+/g, "-"),
			},
			headers: await headers(),
		});

		if (!orgResult) {
			throw new Error("Failed to create practice");
		}

		redirect("/dashboard");
	} catch (error) {
		console.error("Registration error:", error);
		return {
			error:
				error instanceof Error
					? error.message
					: "Failed to create account. Please try again.",
		};
	}
}
