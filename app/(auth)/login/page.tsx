"use client";
import {
	Alert,
	Button,
	Card,
	FieldError,
	Form,
	Input,
	Label,
	TextField,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import NextLink from "next/link";
import { useActionState } from "react";
import { loginAction } from "../actions";

export default function LoginPage() {
	const [state, formAction, isPending] = useActionState(loginAction, null);

	return (
		<Card className="bg-white/5 backdrop-blur-lg border border-white/10">
			<Card.Header className="flex-col items-start gap-2 pb-6">
				<div className="flex items-center gap-2">
					<Icon icon="mdi:shield-lock" className="w-8 h-8 text-blue-500" />
					<h1 className="text-2xl font-bold text-white">Sign In</h1>
				</div>
				<p className="text-gray-400 text-sm">
					Sign in to your dental compliance account
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
					<TextField name="email" type="email" isRequired>
						<Label className="text-white">Email</Label>
						<Input placeholder="Enter your email" autoComplete="email" />
						<FieldError />
					</TextField>

					<TextField name="password" type="password" isRequired>
						<Label className="text-white">Password</Label>
						<Input
							placeholder="Enter your password"
							autoComplete="current-password"
						/>
						<FieldError />
					</TextField>

					<Button
						type="submit"
						variant="primary"
						isPending={isPending}
						fullWidth
					>
						{isPending ? "Signing in..." : "Sign In"}
					</Button>

					<div className="text-center text-sm text-gray-400 mt-4">
						Don't have an account?{" "}
						<NextLink
							href="/register"
							className="text-blue-500 hover:text-blue-400"
						>
							Create one
						</NextLink>
					</div>
				</Form>
			</Card.Content>
		</Card>
	);
}
