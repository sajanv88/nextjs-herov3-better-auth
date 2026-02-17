"use client";

import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useOrg from "@/app/hooks/use-org";
import { authClient } from "@/app/lib/auth-client";

/**
 * Dashboard Sidebar Navigation
 * Role-based menu items for multi-tenant SaaS
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

	console.log("Organization data in sidebar:", org);
	async function handleSignOut() {
		await authClient.signOut();
		router.push("/login");
	}

	return (
		<aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
			{/* Logo */}
			<div className="p-6 border-b border-gray-800">
				<div className="flex items-center gap-2">
					<Icon icon="mdi:application" className="w-8 h-8 text-blue-500" />
					<span className="text-xl font-bold text-white">My App</span>
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
