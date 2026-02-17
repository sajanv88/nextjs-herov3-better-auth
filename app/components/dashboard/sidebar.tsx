"use client";

import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useOrg from "@/app/hooks/use-org";
import { authClient } from "@/app/lib/auth-client";

/**
 * Dashboard Sidebar Navigation
 * Responsive: drawer on mobile, fixed panel on desktop.
 * Role-based menu items for multi-tenant SaaS.
 */

interface NavItem {
	label: string;
	href: string;
	icon: string;
	roles?: string[];
}

const navItems: NavItem[] = [
	{
		label: "Dashboard",
		href: "/dashboard",
		icon: "mdi:view-dashboard",
	},
	{
		label: "Organization",
		href: "/organization",
		icon: "mdi:office-building",
	},
	{
		label: "Settings",
		href: "/settings",
		icon: "mdi:cog",
		roles: ["owner"],
	},
];

export default function DashboardSidebar() {
	const pathname = usePathname();
	const router = useRouter();
	const { org } = useOrg();
	const [mobileOpen, setMobileOpen] = useState(false);
	// Prevent body scroll when drawer is open
	useEffect(() => {
		if (mobileOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [mobileOpen]);

	const orgName = org?.name ?? "My App";

	async function handleSignOut() {
		await authClient.signOut();
		router.push("/login");
	}

	const sidebarContent = (
		<div className="flex flex-col h-full">
			{/* Logo / Org Name */}
			<div className="p-6 border-b border-border">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2 min-w-0">
						<div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shrink-0">
							<span className="text-accent-foreground font-bold text-sm">
								{orgName.charAt(0).toUpperCase()}
							</span>
						</div>
						<span className="text-base font-bold text-foreground truncate">
							{orgName}
						</span>
					</div>
					{/* Close button — mobile only */}
					<button
						type="button"
						onClick={() => setMobileOpen(false)}
						className="md:hidden p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-surface-secondary transition-colors"
						aria-label="Close menu"
					>
						<Icon icon="mdi:close" className="w-5 h-5" />
					</button>
				</div>
			</div>

			{/* Navigation */}
			<nav className="flex-1 overflow-y-auto p-4">
				<ul className="space-y-1">
					{navItems.map((item) => {
						const isActive = pathname === item.href;
						return (
							<li key={item.href}>
								<NextLink
									href={item.href}
									onClick={() => setMobileOpen(false)}
									className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
										isActive
											? "bg-accent text-accent-foreground"
											: "text-muted hover:bg-surface-secondary hover:text-foreground"
									}`}
								>
									<Icon icon={item.icon} className="w-5 h-5 shrink-0" />
									<span className="font-medium text-sm">{item.label}</span>
								</NextLink>
							</li>
						);
					})}
				</ul>
			</nav>

			{/* Sign Out */}
			<div className="p-4 border-t border-border">
				<Button
					variant="ghost"
					onPress={handleSignOut}
					className="w-full justify-start text-muted hover:text-foreground hover:bg-surface-secondary"
				>
					<Icon icon="mdi:logout" className="w-5 h-5" />
					Sign Out
				</Button>
			</div>
		</div>
	);

	return (
		<>
			{/* ── Mobile top bar ─────────────────────────────────── */}
			<header className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-surface border-b border-border flex items-center justify-between px-4">
				<div className="flex items-center gap-2 min-w-0">
					<div className="w-7 h-7 bg-accent rounded-md flex items-center justify-center shrink-0">
						<span className="text-accent-foreground font-bold text-xs">
							{orgName.charAt(0).toUpperCase()}
						</span>
					</div>
					<span className="text-sm font-bold text-foreground truncate">
						{orgName}
					</span>
				</div>
				<button
					type="button"
					onClick={() => setMobileOpen(true)}
					className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-secondary transition-colors"
					aria-label="Open menu"
				>
					<Icon icon="mdi:menu" className="w-5 h-5" />
				</button>
			</header>

			{/* ── Mobile drawer backdrop ──────────────────────────── */}
			{mobileOpen && (
				<button
					type="button"
					className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm cursor-default"
					onClick={() => setMobileOpen(false)}
					aria-label="Close menu"
				/>
			)}

			{/* ── Mobile drawer ───────────────────────────────────── */}
			<aside
				className={`md:hidden fixed top-0 left-0 h-full w-72 z-50 bg-surface border-r border-border transform transition-transform duration-300 ease-in-out ${
					mobileOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				{sidebarContent}
			</aside>

			{/* ── Desktop sidebar ─────────────────────────────────── */}
			<aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-surface border-r border-border flex-col">
				{sidebarContent}
			</aside>
		</>
	);
}
