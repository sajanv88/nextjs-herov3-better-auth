"use client";

import { Icon } from "@iconify/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

/**
 * Dashboard Sidebar Navigation
 * Role-based menu items for dental compliance SaaS
 */

interface NavItem {
	label: string;
	href: string;
	icon: string;
	roles?: string[]; // If undefined, shown to all roles
}

const navItems: NavItem[] = [
	{
		label: "Dashboard",
		href: "/dashboard",
		icon: "mdi:view-dashboard",
	},
	{
		label: "Staff",
		href: "/dashboard/staff",
		icon: "mdi:account-group",
		roles: ["owner", "manager"],
	},
	{
		label: "Training Matrix",
		href: "/dashboard/training",
		icon: "mdi:certificate",
	},
	{
		label: "Certificates",
		href: "/dashboard/certificates",
		icon: "mdi:file-certificate",
	},
	{
		label: "Tasks",
		href: "/dashboard/tasks",
		icon: "mdi:clipboard-check",
	},
	{
		label: "HTM Logs",
		href: "/dashboard/htm-logs",
		icon: "mdi:clipboard-text",
	},
	{
		label: "Policies",
		href: "/dashboard/policies",
		icon: "mdi:file-document",
		roles: ["owner", "manager"],
	},
	{
		label: "Reports",
		href: "/dashboard/reports",
		icon: "mdi:chart-line",
		roles: ["owner", "manager"],
	},
	{
		label: "Settings",
		href: "/dashboard/settings",
		icon: "mdi:cog",
		roles: ["owner"],
	},
];

export default function DashboardSidebar() {
	const pathname = usePathname();
	const router = useRouter();

	async function handleSignOut() {
		await authClient.signOut();
		router.push("/login");
	}

	return (
		<aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
			{/* Logo */}
			<div className="p-6 border-b border-gray-800">
				<div className="flex items-center gap-2">
					<Icon icon="mdi:tooth" className="w-8 h-8 text-blue-500" />
					<span className="text-xl font-bold text-white">
						Dental Compliance
					</span>
				</div>
			</div>

			{/* Navigation */}
			<nav className="flex-1 overflow-y-auto p-4">
				<ul className="space-y-2">
					{navItems.map((item) => {
						const isActive = pathname === item.href;
						return (
							<li key={item.href}>
								<NextLink
									href={item.href}
									className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
										isActive
											? "bg-blue-600 text-white"
											: "text-gray-300 hover:bg-gray-800 hover:text-white"
									}`}
								>
									<Icon icon={item.icon} className="w-5 h-5" />
									<span className="font-medium">{item.label}</span>
								</NextLink>
							</li>
						);
					})}
				</ul>
			</nav>

			{/* User Info & Sign Out */}
			<div className="p-4 border-t border-gray-800">
				<Button
					variant="ghost"
					onPress={handleSignOut}
					className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
				>
					<Icon icon="mdi:logout" className="w-5 h-5" />
					Sign Out
				</Button>
			</div>
		</aside>
	);
}
