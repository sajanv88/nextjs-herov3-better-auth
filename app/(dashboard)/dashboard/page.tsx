import { Card, CardContent, CardHeader } from "@heroui/react";
import { Icon } from "@iconify/react";

/**
 * Dashboard Home Page
 * Overview of activity and statistics
 */
export default function DashboardPage() {
	return (
		<div>
			<h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<Card className="bg-white/5 backdrop-blur-lg border border-white/10">
					<CardHeader className="flex-row items-center gap-3">
						<div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
							<Icon
								icon="mdi:account-group"
								className="w-6 h-6 text-blue-500"
							/>
						</div>
						<div>
							<p className="text-gray-400 text-sm">Total Users</p>
							<p className="text-2xl font-bold text-white">0</p>
						</div>
					</CardHeader>
				</Card>

				<Card className="bg-white/5 backdrop-blur-lg border border-white/10">
					<CardHeader className="flex-row items-center gap-3">
						<div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
							<Icon
								icon="mdi:check-circle"
								className="w-6 h-6 text-green-500"
							/>
						</div>
						<div>
							<p className="text-gray-400 text-sm">Active</p>
							<p className="text-2xl font-bold text-white">0</p>
						</div>
					</CardHeader>
				</Card>

				<Card className="bg-white/5 backdrop-blur-lg border border-white/10">
					<CardHeader className="flex-row items-center gap-3">
						<div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
							<Icon
								icon="mdi:clock-outline"
								className="w-6 h-6 text-yellow-500"
							/>
						</div>
						<div>
							<p className="text-gray-400 text-sm">Pending</p>
							<p className="text-2xl font-bold text-white">0</p>
						</div>
					</CardHeader>
				</Card>

				<Card className="bg-white/5 backdrop-blur-lg border border-white/10">
					<CardHeader className="flex-row items-center gap-3">
						<div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
							<Icon icon="mdi:chart-line" className="w-6 h-6 text-purple-500" />
						</div>
						<div>
							<p className="text-gray-400 text-sm">Total</p>
							<p className="text-2xl font-bold text-white">0</p>
						</div>
					</CardHeader>
				</Card>
			</div>

			{/* Welcome Card */}
			<Card className="bg-white/5 backdrop-blur-lg border border-white/10">
				<CardHeader>
					<h2 className="text-xl font-bold text-white">
						Welcome to Your Dashboard
					</h2>
				</CardHeader>
				<CardContent>
					<p className="text-gray-300 mb-4">
						Get started by exploring the features of your application.
					</p>
					<div className="flex flex-col gap-2 text-gray-400">
						<div className="flex items-center gap-2">
							<Icon icon="mdi:check-circle" className="text-green-500" />
							<span>Multi-tenant data isolation</span>
						</div>
						<div className="flex items-center gap-2">
							<Icon icon="mdi:check-circle" className="text-green-500" />
							<span>Role-based access control</span>
						</div>
						<div className="flex items-center gap-2">
							<Icon icon="mdi:check-circle" className="text-green-500" />
							<span>Secure authentication with Better Auth</span>
						</div>
						<div className="flex items-center gap-2">
							<Icon icon="mdi:check-circle" className="text-green-500" />
							<span>Modern UI with Hero UI components</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
