"use client";

import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { authClient } from "@/app/lib/auth-client";
export default function SocialLogin() {
	async function handleGitHubSignIn() {
		await authClient.signIn.social({
			provider: "github",
		});
	}
	return (
		<Button className="w-full" variant="primary" onPress={handleGitHubSignIn}>
			<Icon icon="mdi:github" />
			Sign in with GitHub
		</Button>
	);
}
