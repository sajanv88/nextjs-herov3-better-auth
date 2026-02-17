"use client";

import {
	Alert,
	Avatar,
	Button,
	Card,
	FieldError,
	Form,
	Input,
	Label,
	Switch,
	Tabs,
	TextField,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";

/**
 * Profile Settings Page
 * Tabbed interface for Account Info and Security settings
 */

function AccountTab() {
	const { data: session } = authClient.useSession();
	const [isSaving, setIsSaving] = useState(false);
	const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
		"idle",
	);

	async function handleSave(e: {
		preventDefault(): void;
		currentTarget: HTMLFormElement;
	}) {
		e.preventDefault();
		setIsSaving(true);
		setSaveStatus("idle");
		// Simulate save — wire up to authClient.updateUser() when needed
		await new Promise((r) => setTimeout(r, 800));
		setIsSaving(false);
		setSaveStatus("success");
		setTimeout(() => setSaveStatus("idle"), 3000);
	}

	return (
		<div className="space-y-6">
			{saveStatus === "success" && (
				<Alert status="success">
					<Alert.Indicator />
					<Alert.Content>
						<Alert.Description>Profile updated successfully.</Alert.Description>
					</Alert.Content>
				</Alert>
			)}

			{/* Avatar Upload */}
			<Card className="bg-surface-secondary border border-border">
				<Card.Header>
					<h3 className="text-base font-semibold text-foreground">
						Profile Picture
					</h3>
					<p className="text-muted text-sm">
						Upload a photo to personalize your account.
					</p>
				</Card.Header>
				<Card.Content>
					<div className="flex items-center gap-5">
						<Avatar className="w-20 h-20">
							{session?.user?.image ? (
								<Avatar.Image
									src={session.user.image}
									alt={session?.user?.name ?? "User"}
								/>
							) : null}
							<Avatar.Fallback className="bg-accent text-accent-foreground text-2xl font-bold w-20 h-20">
								{(session?.user?.name ?? "U")
									.split(" ")
									.map((n) => n[0])
									.join("")
									.toUpperCase()}
							</Avatar.Fallback>
						</Avatar>
						<div className="flex flex-col gap-2">
							<Button
								variant="secondary"
								className="flex items-center gap-2 text-sm"
							>
								<Icon icon="mdi:upload" className="w-4 h-4" />
								Upload Photo
							</Button>
							<Button
								variant="ghost"
								className="flex items-center gap-2 text-sm text-muted hover:text-danger"
							>
								<Icon icon="mdi:delete-outline" className="w-4 h-4" />
								Remove
							</Button>
						</div>
					</div>
					<p className="text-muted text-xs mt-3">
						JPG, PNG or GIF. Max size 2MB.
					</p>
				</Card.Content>
			</Card>

			{/* Account Info Form */}
			<Card className="bg-surface-secondary border border-border">
				<Card.Header>
					<h3 className="text-base font-semibold text-foreground">
						Account Information
					</h3>
					<p className="text-muted text-sm">
						Update your name and email address.
					</p>
				</Card.Header>
				<Card.Content>
					<Form onSubmit={handleSave} className="flex flex-col gap-4">
						<TextField name="name" defaultValue={session?.user?.name ?? ""}>
							<Label>Full Name</Label>
							<Input placeholder="Your full name" variant="secondary" />
							<FieldError />
						</TextField>

						<TextField
							name="email"
							type="email"
							defaultValue={session?.user?.email ?? ""}
						>
							<Label>Email Address</Label>
							<Input placeholder="your@email.com" variant="secondary" />
							<FieldError />
						</TextField>

						<div className="flex justify-end pt-2">
							<Button
								type="submit"
								variant="primary"
								isPending={isSaving}
								className="flex items-center gap-2"
							>
								<Icon icon="mdi:content-save" className="w-4 h-4" />
								{isSaving ? "Saving..." : "Save Changes"}
							</Button>
						</div>
					</Form>
				</Card.Content>
			</Card>
		</div>
	);
}

function SecurityTab() {
	const [twoFAEnabled, setTwoFAEnabled] = useState(false);
	const [isResetting, setIsResetting] = useState(false);
	const [resetSent, setResetSent] = useState(false);

	async function handlePasswordReset() {
		setIsResetting(true);
		await new Promise((r) => setTimeout(r, 800));
		setIsResetting(false);
		setResetSent(true);
	}

	return (
		<div className="space-y-6">
			{/* Password Reset */}
			<Card className="bg-surface-secondary border border-border">
				<Card.Header>
					<h3 className="text-base font-semibold text-foreground">
						Change Password
					</h3>
					<p className="text-muted text-sm">
						We'll send a password reset link to your email.
					</p>
				</Card.Header>
				<Card.Content>
					{resetSent ? (
						<div className="flex items-center gap-3 text-success bg-success/10 border border-success/20 rounded-lg px-4 py-3">
							<Icon icon="mdi:check-circle" className="w-5 h-5 shrink-0" />
							<p className="text-sm">
								Reset email sent! Check your inbox to continue.
							</p>
						</div>
					) : (
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
									<Icon
										icon="mdi:lock-outline"
										className="w-5 h-5 text-warning"
									/>
								</div>
								<div>
									<p className="text-foreground text-sm font-medium">
										Password last changed
									</p>
									<p className="text-muted text-xs">30 days ago</p>
								</div>
							</div>
							<Button
								variant="secondary"
								isPending={isResetting}
								onPress={handlePasswordReset}
								className="flex items-center gap-2 text-sm"
							>
								<Icon icon="mdi:lock-reset" className="w-4 h-4" />
								{isResetting ? "Sending..." : "Send Reset Email"}
							</Button>
						</div>
					)}
				</Card.Content>
			</Card>

			{/* Two-Factor Authentication */}
			<Card className="bg-surface-secondary border border-border">
				<Card.Header>
					<h3 className="text-base font-semibold text-foreground">
						Two-Factor Authentication
					</h3>
					<p className="text-muted text-sm">
						Add an extra layer of security to your account.
					</p>
				</Card.Header>
				<Card.Content>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div
								className={`w-10 h-10 rounded-lg flex items-center justify-center ${twoFAEnabled ? "bg-success/20" : "bg-default"}`}
							>
								<Icon
									icon={
										twoFAEnabled ? "mdi:shield-check" : "mdi:shield-outline"
									}
									className={`w-5 h-5 ${twoFAEnabled ? "text-success" : "text-muted"}`}
								/>
							</div>
							<div>
								<p className="text-foreground text-sm font-medium">
									Authenticator App
								</p>
								<p className="text-muted text-xs">
									{twoFAEnabled
										? "2FA is active — your account is secured"
										: "Enable for stronger account protection"}
								</p>
							</div>
						</div>
						<Switch
							isSelected={twoFAEnabled}
							onChange={() => setTwoFAEnabled(!twoFAEnabled)}
						>
							<Switch.Control>
								<Switch.Thumb />
							</Switch.Control>
						</Switch>
					</div>

					{twoFAEnabled && (
						<div className="mt-4 p-3 bg-success/5 border border-success/20 rounded-lg">
							<p className="text-success text-xs flex items-center gap-1.5">
								<Icon icon="mdi:information" className="w-4 h-4 shrink-0" />
								Your account is protected with two-factor authentication. You'll
								need your authenticator app on next login.
							</p>
						</div>
					)}
				</Card.Content>
			</Card>

			{/* Active Sessions */}
			<Card className="bg-surface-secondary border border-border">
				<Card.Header>
					<h3 className="text-base font-semibold text-foreground">
						Active Sessions
					</h3>
					<p className="text-muted text-sm">
						Devices currently signed into your account.
					</p>
				</Card.Header>
				<Card.Content>
					<div className="space-y-3">
						{[
							{
								device: "Chrome on macOS",
								location: "San Francisco, US",
								icon: "mdi:laptop",
								current: true,
							},
							{
								device: "Firefox on Windows",
								location: "New York, US",
								icon: "mdi:monitor",
								current: false,
							},
						].map((session) => (
							<div
								key={session.device}
								className="flex items-center justify-between py-2"
							>
								<div className="flex items-center gap-3">
									<Icon icon={session.icon} className="w-5 h-5 text-muted" />
									<div>
										<p className="text-foreground text-sm font-medium flex items-center gap-2">
											{session.device}
											{session.current && (
												<span className="text-xs bg-success/20 text-success border border-success/20 px-1.5 py-0.5 rounded-full">
													Current
												</span>
											)}
										</p>
										<p className="text-muted text-xs">{session.location}</p>
									</div>
								</div>
								{!session.current && (
									<button
										type="button"
										className="text-xs text-danger hover:text-danger/80 transition-colors"
									>
										Revoke
									</button>
								)}
							</div>
						))}
					</div>
				</Card.Content>
			</Card>
		</div>
	);
}

export default function SettingsPage() {
	return (
		<div>
			{/* Page Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
				<p className="text-muted mt-1">
					Manage your account preferences and security.
				</p>
			</div>

			{/* HeroUI v3 Tabs */}
			<Tabs defaultSelectedKey="account" className="w-full" variant="secondary">
				<Tabs.ListContainer>
					<Tabs.List aria-label="Profile Settings">
						<Tabs.Tab id="account">
							<Icon icon="mdi:account" className="w-4 h-4" />
							Account Info
							<Tabs.Indicator />
						</Tabs.Tab>
						<Tabs.Tab id="security">
							<Icon icon="mdi:shield-lock" className="w-4 h-4" />
							Security
							<Tabs.Indicator />
						</Tabs.Tab>
					</Tabs.List>
				</Tabs.ListContainer>

				<Tabs.Panel id="account">
					<AccountTab />
				</Tabs.Panel>
				<Tabs.Panel id="security">
					<SecurityTab />
				</Tabs.Panel>
			</Tabs>
		</div>
	);
}
