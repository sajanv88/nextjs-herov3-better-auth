import DashboardSidebar from "@/app/components/dashboard/sidebar";

/**
 * Dashboard Layout
 * Protected layout with sidebar navigation for all dashboard pages
 */
export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
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
