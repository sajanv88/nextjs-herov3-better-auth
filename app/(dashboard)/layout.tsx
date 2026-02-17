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
		<div className="min-h-screen bg-background">
			<div className="flex">
				{/* Sidebar */}
				<DashboardSidebar />

				{/* Main Content — offset for fixed sidebar on desktop, top bar on mobile */}
				<main className="flex-1 md:ml-64 pt-20 px-5 md:pt-5  w-full min-w-0">
					<section className="max-w-5xl mx-auto">{children}</section>
				</main>
			</div>
		</div>
	);
}
