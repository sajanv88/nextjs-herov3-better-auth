import { Card } from "@heroui/react";
import { Icon } from "@iconify/react";

/**
 * Enhanced Dashboard Page
 * KPI cards, user activity chart placeholder, and recent activity feed
 */

const kpiCards = [
	{
		label: "Total Users",
		value: "1,284",
		icon: "mdi:account-group",
		iconBg: "bg-accent/20",
		iconColor: "text-accent",
		trend: "+12%",
		trendUp: true,
	},
	{
		label: "Active Sessions",
		value: "347",
		icon: "mdi:lightning-bolt",
		iconBg: "bg-success/20",
		iconColor: "text-success",
		trend: "+8%",
		trendUp: true,
	},
	{
		label: "Monthly Growth",
		value: "24.5%",
		icon: "mdi:trending-up",
		iconBg: "bg-accent/30",
		iconColor: "text-accent",
		trend: "+3.2%",
		trendUp: true,
	},
];

const chartBars = [
	{ height: 42, label: "Week 1" },
	{ height: 68, label: "Week 1" },
	{ height: 53, label: "Week 2" },
	{ height: 78, label: "Week 2" },
	{ height: 61, label: "Week 2" },
	{ height: 90, label: "Week 3" },
	{ height: 74, label: "Week 3" },
	{ height: 88, label: "Week 3" },
	{ height: 63, label: "Week 4" },
	{ height: 79, label: "Week 4" },
	{ height: 95, label: "Week 4" },
	{ height: 82, label: "Week 5" },
];

const activityFeed = [
	{
		id: "act-1",
		action: "New member invited",
		user: "Alice Johnson",
		time: "2 min ago",
		icon: "mdi:account-plus",
		iconBg: "bg-accent/20",
		iconColor: "text-accent",
	},
	{
		id: "act-2",
		action: "Organization settings updated",
		user: "Bob Smith",
		time: "15 min ago",
		icon: "mdi:cog",
		iconBg: "bg-default",
		iconColor: "text-muted",
	},
	{
		id: "act-3",
		action: "New session started",
		user: "Carol White",
		time: "1 hr ago",
		icon: "mdi:login",
		iconBg: "bg-success/20",
		iconColor: "text-success",
	},
	{
		id: "act-4",
		action: "Role changed to Admin",
		user: "Dave Brown",
		time: "3 hr ago",
		icon: "mdi:shield-account",
		iconBg: "bg-warning/20",
		iconColor: "text-warning",
	},
	{
		id: "act-5",
		action: "Password reset completed",
		user: "Eve Davis",
		time: "5 hr ago",
		icon: "mdi:lock-reset",
		iconBg: "bg-accent/30",
		iconColor: "text-accent",
	},
];

export default function DashboardPage() {
	return (
		<div>
			{/* Page Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
				<p className="text-muted mt-1">
					Welcome back! Here's what's happening in your organization.
				</p>
			</div>

			{/* KPI Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				{kpiCards.map((card) => (
					<Card
						key={card.label}
						className="bg-surface-secondary border border-border hover:bg-surface-tertiary transition-colors"
					>
						<Card.Header className="flex-row items-center justify-between pb-2">
							<div
								className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center`}
							>
								<Icon
									icon={card.icon}
									className={`w-6 h-6 ${card.iconColor}`}
								/>
							</div>
							<span
								className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
									card.trendUp
										? "text-success bg-success/10 border border-success/20"
										: "text-danger bg-danger/10 border border-danger/20"
								}`}
							>
								{card.trend}
							</span>
						</Card.Header>
						<Card.Content>
							<p className="text-muted text-sm">{card.label}</p>
							<p className="text-3xl font-bold text-foreground mt-1">
								{card.value}
							</p>
						</Card.Content>
					</Card>
				))}
			</div>

			{/* Chart + Activity Feed */}
			<div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
				{/* User Activity Chart Placeholder */}
				<Card className="bg-surface-secondary border border-border lg:col-span-3">
					<Card.Header className="flex-row items-center justify-between">
						<div>
							<h2 className="text-lg font-semibold text-foreground">
								User Activity
							</h2>
							<p className="text-muted text-sm">Last 30 days</p>
						</div>
						<div className="flex items-center gap-4 text-xs text-muted">
							<div className="flex items-center gap-1.5">
								<span className="w-2.5 h-2.5 rounded-full bg-accent inline-block" />
								Sessions
							</div>
						</div>
					</Card.Header>
					<Card.Content>
						{/* Bar chart visualization */}
						<div className="h-48 flex items-end gap-1.5">
							{chartBars.map((bar) => (
								<div
									key={bar.label + bar.height}
									className="flex-1 flex flex-col items-center justify-end"
								>
									<div
										className="w-full bg-accent/60 hover:bg-accent rounded-t-sm transition-colors cursor-default"
										style={{ height: `${bar.height}%` }}
										title={`${bar.height} sessions`}
									/>
								</div>
							))}
						</div>
						{/* X-axis */}
						<div className="flex justify-between mt-3 pt-2 border-t border-separator">
							{["Jan 1", "Jan 9", "Jan 17", "Jan 24", "Jan 30"].map((label) => (
								<span key={label} className="text-muted text-xs">
									{label}
								</span>
							))}
						</div>
					</Card.Content>
				</Card>

				{/* Recent Activity Feed */}
				<Card className="bg-surface-secondary border border-border lg:col-span-2">
					<Card.Header className="flex-row items-center justify-between">
						<div>
							<h2 className="text-lg font-semibold text-foreground">
								Recent Activity
							</h2>
							<p className="text-muted text-sm">Last 5 actions</p>
						</div>
						<div className="w-2 h-2 rounded-full bg-success animate-pulse" />
					</Card.Header>
					<Card.Content>
						<div className="space-y-1">
							{activityFeed.map((item, idx) => (
								<div key={item.id}>
									<div className="flex items-start gap-3 py-2.5">
										<div
											className={`w-8 h-8 ${item.iconBg} rounded-lg flex items-center justify-center shrink-0 mt-0.5`}
										>
											<Icon
												icon={item.icon}
												className={`w-4 h-4 ${item.iconColor}`}
											/>
										</div>
										<div className="min-w-0 flex-1">
											<p className="text-foreground text-sm font-medium leading-tight">
												{item.action}
											</p>
											<p className="text-muted text-xs mt-0.5">
												{item.user} · {item.time}
											</p>
										</div>
									</div>
									{idx < activityFeed.length - 1 && (
										<div className="h-px bg-separator ml-11" />
									)}
								</div>
							))}
						</div>
					</Card.Content>
				</Card>
			</div>
		</div>
	);
}
