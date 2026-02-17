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
	ListBox,
	Modal,
	Select,
	TextField,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import NextLink from "next/link";
import { useState } from "react";
import useOrg from "@/app/hooks/use-org";
import { authClient } from "@/app/lib/auth-client";

/**
 * Organization Management Page
 * Shows org details, member list, and invite modal
 */

type Member = {
	id: string;
	name: string;
	email: string;
	role: string;
	joinedAt: string;
};

// Placeholder members — replace with real data from useOrg()
const placeholderMembers: Member[] = [
	{
		id: "1",
		name: "Alice Johnson",
		email: "alice@acme.com",
		role: "owner",
		joinedAt: "Jan 2025",
	},
	{
		id: "2",
		name: "Bob Smith",
		email: "bob@acme.com",
		role: "admin",
		joinedAt: "Feb 2025",
	},
	{
		id: "3",
		name: "Carol White",
		email: "carol@acme.com",
		role: "member",
		joinedAt: "Mar 2025",
	},
];

const roleBadgeStyles: Record<string, string> = {
	owner: "bg-accent/30 text-accent border-accent/30",
	admin: "bg-accent/20 text-accent border-accent/30",
	member: "bg-default border-border text-muted",
};

function RoleBadge({ role }: { role: string }) {
	return (
		<span
			className={`text-xs font-medium px-2 py-0.5 rounded-full border capitalize ${roleBadgeStyles[role] ?? roleBadgeStyles.member}`}
		>
			{role}
		</span>
	);
}

type InviteRole = "owner" | "admin" | "member";

interface InviteModelContentProps {
	org: ReturnType<typeof useOrg>["org"];
}
function InviteModalContent({ org }: InviteModelContentProps) {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [role, setRole] = useState<InviteRole>("member");
	const orgId = org?.id;
	const pendingInvitations = org?.invitations ?? [];

	async function handleInvite(e: {
		preventDefault(): void;
		currentTarget: HTMLFormElement;
	}) {
		e.preventDefault();
		setError(null);
		setIsPending(true);

		const form = e.currentTarget;
		const email = (form.elements.namedItem("email") as HTMLInputElement).value;

		const { error: inviteError } = await authClient.organization.inviteMember({
			email,
			role,
			...(orgId ? { organizationId: orgId } : {}),
		});

		if (inviteError) {
			setError(inviteError.message ?? "Failed to send invite");
		} else {
			setSuccess(true);
		}

		setIsPending(false);
	}

	if (success) {
		return (
			<div className="text-center py-6">
				<div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-3">
					<Icon icon="mdi:check-circle" className="w-6 h-6 text-success" />
				</div>
				<p className="text-foreground font-semibold">Invitation sent!</p>
				<p className="text-muted text-sm mt-1">
					The invite email has been dispatched.
				</p>
			</div>
		);
	}

	return (
		<>
			{error && (
				<Alert status="danger" className="mb-4">
					<Alert.Indicator />
					<Alert.Content>
						<Alert.Description>{error}</Alert.Description>
					</Alert.Content>
				</Alert>
			)}

			<Form onSubmit={handleInvite} className="flex flex-col gap-4">
				<TextField name="email" type="email" isRequired>
					<Label>Email address</Label>
					<Input placeholder="colleague@company.com" variant="secondary" />
					<FieldError />
				</TextField>

				{/* Role Select — HeroUI v3 */}
				<Select
					fullWidth
					variant="secondary"
					placeholder="Select a role"
					value={role}
					onChange={(val) => {
						if (val) setRole(val as InviteRole);
					}}
				>
					<Label>Role</Label>
					<Select.Trigger>
						<Select.Value />
						<Select.Indicator />
					</Select.Trigger>
					<Select.Popover>
						<ListBox>
							<ListBox.Item id="owner" textValue="Owner">
								Owner
								<ListBox.ItemIndicator />
							</ListBox.Item>
							<ListBox.Item id="admin" textValue="Admin">
								Admin
								<ListBox.ItemIndicator />
							</ListBox.Item>
							<ListBox.Item id="member" textValue="Member">
								Member
								<ListBox.ItemIndicator />
							</ListBox.Item>
						</ListBox>
					</Select.Popover>
				</Select>

				{/* Pending Invitations */}
				{pendingInvitations.length > 0 && (
					<div className="mt-1">
						<p className="text-sm font-medium text-foreground mb-2">
							Pending Invitations
						</p>
						<div className="space-y-2">
							{pendingInvitations.map(
								(inv: (typeof pendingInvitations)[number]) => (
									<div
										key={inv.id}
										className="flex items-center justify-between bg-surface-secondary rounded-lg px-3 py-2"
									>
										<div className="flex items-center gap-2 min-w-0">
											<Icon
												icon="mdi:email-clock"
												className="w-4 h-4 text-warning shrink-0"
											/>
											<span className="text-sm text-foreground truncate">
												{inv.email}
											</span>
										</div>
										<div className="flex items-center gap-2 shrink-0 ml-2">
											<RoleBadge role={inv.role} />
											<span className="text-xs text-muted">{inv.sentAt}</span>
										</div>
									</div>
								),
							)}
						</div>
					</div>
				)}

				<div className="flex gap-3 pt-1">
					<Button
						type="submit"
						variant="primary"
						isPending={isPending}
						className="flex-1"
					>
						{isPending ? "Sending..." : "Send Invite"}
					</Button>
				</div>
			</Form>
		</>
	);
}

export default function OrganizationPage() {
	const { org } = useOrg();

	const orgName = org?.name ?? "Your Organization";
	const orgSlug = org?.slug ?? "—";
	const memberCount = org?.members?.length ?? placeholderMembers.length;
	const pendingInvitations = org?.invitations ?? [];
	return (
		<div>
			{/* Page Header */}
			<div className="flex items-start justify-between mb-8">
				<div>
					<h1 className="text-3xl font-bold text-foreground">Organization</h1>
					<p className="text-muted mt-1">
						Manage your team and organization settings.
					</p>
				</div>
				{/* Settings button navigates to /settings */}
				<NextLink href="/settings">
					<Button
						variant="ghost"
						className="flex items-center gap-2 border border-border text-muted hover:text-foreground hover:bg-surface-secondary"
					>
						<Icon icon="mdi:cog" className="w-4 h-4" />
						Settings
					</Button>
				</NextLink>
			</div>

			{/* Org Details Card */}
			<Card className="bg-surface-secondary border border-border mb-6">
				<Card.Header className="flex-row items-center gap-4">
					<div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center shrink-0">
						<span className="text-2xl font-bold text-accent-foreground">
							{orgName.charAt(0).toUpperCase()}
						</span>
					</div>
					<div className="flex-1 min-w-0">
						<h2 className="text-xl font-bold text-foreground truncate">
							{orgName}
						</h2>
						<p className="text-muted text-sm mt-0.5">
							Slug:{" "}
							<code className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-xs">
								{orgSlug}
							</code>
						</p>
					</div>
				</Card.Header>
				<Card.Content>
					<div className="grid grid-cols-3 gap-4">
						<div className="bg-surface-tertiary rounded-lg p-3 text-center">
							<p className="text-2xl font-bold text-foreground">
								{memberCount}
							</p>
							<p className="text-muted text-xs mt-0.5">Members</p>
						</div>
						<div className="bg-surface-tertiary rounded-lg p-3 text-center">
							<p className="text-2xl font-bold text-foreground">
								{pendingInvitations.length}
							</p>
							<p className="text-muted text-xs mt-0.5">Pending</p>
						</div>
						<div className="bg-surface-tertiary rounded-lg p-3 text-center">
							<p className="text-2xl font-bold text-foreground">3</p>
							<p className="text-muted text-xs mt-0.5">Departments</p>
						</div>
					</div>
				</Card.Content>
			</Card>

			{/* Members List */}
			<Card className="bg-surface-secondary border border-border">
				<Card.Header className="flex-row items-center justify-between flex-wrap gap-3">
					<div>
						<h2 className="text-lg font-semibold text-foreground">
							Team Members
						</h2>
						<p className="text-muted text-sm">
							{memberCount} member{memberCount !== 1 ? "s" : ""} in this
							organization
						</p>
					</div>

					{/* HeroUI Modal — Button inside is the trigger */}
					<Modal>
						<Button variant="primary" className="flex items-center gap-2">
							<Icon icon="mdi:account-plus" className="w-4 h-4" />
							Invite Member
						</Button>
						<Modal.Backdrop variant="blur">
							<Modal.Container>
								<Modal.Dialog className="sm:max-w-120">
									<Modal.CloseTrigger />
									<Modal.Header>
										<Modal.Heading>Invite Team Member</Modal.Heading>
									</Modal.Header>
									<Modal.Body>
										<InviteModalContent org={org} />
									</Modal.Body>
								</Modal.Dialog>
							</Modal.Container>
						</Modal.Backdrop>
					</Modal>
				</Card.Header>

				<Card.Content>
					{/* Table header */}
					<div className="hidden sm:grid grid-cols-12 gap-4 px-3 py-2 text-xs font-medium text-muted uppercase tracking-wider border-b border-separator mb-1">
						<span className="col-span-5">Member</span>
						<span className="col-span-3">Role</span>
						<span className="col-span-3">Joined</span>
						<span className="col-span-1" />
					</div>

					{/* Member rows */}
					<div className="space-y-1">
						{placeholderMembers.map((member) => (
							<div
								key={member.id}
								className="flex flex-col sm:grid sm:grid-cols-12 gap-2 sm:gap-4 items-start sm:items-center px-3 py-3 rounded-lg hover:bg-surface-tertiary transition-colors group"
							>
								{/* Avatar + Name */}
								<div className="col-span-5 flex items-center gap-3 min-w-0 w-full sm:w-auto">
									<Avatar>
										<Avatar.Fallback className="bg-accent text-accent-foreground text-sm">
											{member.name
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</Avatar.Fallback>
									</Avatar>
									<div className="min-w-0 flex-1">
										<p className="text-foreground text-sm font-medium truncate">
											{member.name}
										</p>
										<p className="text-muted text-xs truncate">
											{member.email}
										</p>
									</div>
								</div>

								{/* Role + Joined — shown inline on mobile */}
								<div className="col-span-3 ml-11 sm:ml-0">
									<RoleBadge role={member.role} />
								</div>
								<div className="col-span-3 hidden sm:block">
									<span className="text-muted text-sm">{member.joinedAt}</span>
								</div>

								{/* Actions */}
								<div className="col-span-1 hidden sm:flex justify-end">
									<button
										type="button"
										className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-surface-secondary text-muted hover:text-foreground"
										aria-label="Member options"
									>
										<Icon icon="mdi:dots-vertical" className="w-4 h-4" />
									</button>
								</div>
							</div>
						))}
					</div>
				</Card.Content>
			</Card>
		</div>
	);
}
