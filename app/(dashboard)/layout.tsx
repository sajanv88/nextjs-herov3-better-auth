import { redirect } from "next/navigation";
import { isAuthenticated } from "@/app/(auth)/actions";
import DashboardSidebar from "@/app/components/dashboard/sidebar";
/**
 * Dashboard Layout
 * Protected layout with sidebar navigation for all dashboard pages
 */
export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const authenticated = await isAuthenticated();

	if (!authenticated) {
		// If no session, redirect to login
		redirect("/login");
	}
	return (
		<div className="min-h-screen bg-gray-950">
			<div className="flex">
				{/* Sidebar */}
				<DashboardSidebar />

				{/* Main Content */}
				<main className="flex-1 ml-64 p-8">{children}</main>
			</div>
		</div>
	);
}
