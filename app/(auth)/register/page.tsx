"use client";

import {
	Alert,
	Button,
	Card,
	Description,
	FieldError,
	Form,
	Input,
	Label,
	TextField,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import NextLink from "next/link";
import { useActionState } from "react";
import { registerAction } from "../actions";

export default function RegisterPage() {
	const [state, formAction, isPending] = useActionState(registerAction, null);

	return (
		<Card className="bg-white/5 backdrop-blur-lg border border-white/10">
			<Card.Header className="flex-col items-start gap-2 pb-6">
				<div className="flex items-center gap-2">
					<Icon icon="mdi:account-plus" className="w-8 h-8 text-blue-500" />
					<h1 className="text-2xl font-bold text-white">Create Account</h1>
				</div>
				<p className="text-gray-400 text-sm">
					Register your organization and get started
				</p>
			</Card.Header>

			<Card.Content>
				{state?.error && (
					<Alert status="danger" className="mb-4">
						<Alert.Indicator />
						<Alert.Content>
							<Alert.Description>{state.error}</Alert.Description>
						</Alert.Content>
					</Alert>
				)}

				<Form action={formAction} className="flex flex-col gap-4">
					<TextField name="organizationName" isRequired>
						<Label className="text-white">Organization Name</Label>
						<Input
							placeholder="e.g., Acme Corporation"
							defaultValue={state?.organizationName || ""}
						/>
						<FieldError />
					</TextField>

					<TextField name="name" isRequired>
						<Label className="text-white">Your Name</Label>
						<Input placeholder="Jane Smith" defaultValue={state?.name || ""} />
						<FieldError />
					</TextField>

					<TextField name="email" type="email" isRequired>
						<Label className="text-white">Email</Label>
						<Input
							placeholder="Enter your email"
							autoComplete="email"
							defaultValue={state?.email || ""}
						/>
						<FieldError />
					</TextField>

					<TextField name="password" type="password" isRequired>
						<Label className="text-white">Password</Label>
						<Input
							placeholder="Enter your password"
							autoComplete="new-password"
						/>
						<Description className="text-gray-400">
							At least 8 characters
						</Description>
						<FieldError />
					</TextField>

					<TextField name="confirmPassword" type="password" isRequired>
						<Label className="text-white">Confirm Password</Label>
						<Input
							placeholder="Confirm your password"
							autoComplete="new-password"
						/>
						<FieldError />
					</TextField>

					<Button
						type="submit"
						variant="primary"
						isPending={isPending}
						fullWidth
					>
						{isPending ? "Creating account..." : "Create Account"}
					</Button>

					<div className="text-center text-sm text-gray-400 mt-4">
						Already have an account?{" "}
						<NextLink
							href="/login"
							className="text-blue-500 hover:text-blue-400"
						>
							Sign in
						</NextLink>
					</div>
				</Form>
			</Card.Content>
		</Card>
	);
}
