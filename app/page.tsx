import {
	Button,
	Card,
	CardHeader,
	CardDescription,
	CardContent,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import NextLink from "next/link";
import SocialLogin from "@/app/components/social-login";

export default function Home() {
	return (
		<div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-950">
			{/* Navigation */}
			<header>
				<nav className="fixed top-0 w-full bg-black/20 backdrop-blur-lg border-b border-white/10 z-50">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex justify-between items-center h-16">
							<div className="flex items-center">
								<span className="text-2xl font-bold text-white">ACME</span>
							</div>
							<div className="flex items-center gap-4">
								<NextLink
									href="#features"
									className="text-white hover:text-gray-300 transition-colors"
								>
									Features
								</NextLink>
								<NextLink
									href="#pricing"
									className="text-white hover:text-gray-300 transition-colors"
								>
									Pricing
								</NextLink>
								<SocialLogin />
							</div>
						</div>
					</div>
				</nav>
			</header>

			{/* Hero Section */}
			<main>
				<section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
					<div className="max-w-7xl mx-auto">
						<div className="text-center">
							<h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6">
								Websites Made{" "}
								<span className="bg-linear-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text">
									Beautiful
								</span>
							</h1>
							<p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
								Create, manage, and share stunning websites with ease.
								Collaborate with your team in real-time.
							</p>

							{/* CTA Buttons */}
							<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
								<Button
									size="lg"
									variant="primary"
									className="text-lg px-8 py-6 font-semibold flex items-center gap-2"
								>
									Get Started
								</Button>
								<Button
									size="lg"
									variant="ghost"
									className="text-lg px-8 py-6 font-semibold border-white text-white hover:bg-white/10"
								>
									Learn More
								</Button>
							</div>
						</div>

						{/* Features Grid */}
						<section
							id="features"
							className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
						>
							<Card className="bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all">
								<CardHeader className="flex-col items-start">
									<div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg mb-4 flex items-center justify-center">
										<Icon
											icon="mdi:lightning-bolt"
											className="w-6 h-6 text-white"
										/>
									</div>
									<h3 className="text-xl font-bold text-white mb-2">
										Lightning Fast
									</h3>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-gray-300">
										Built with performance in mind. Load your websites in
										milliseconds.
									</CardDescription>
								</CardContent>
							</Card>

							<Card className="bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all">
								<CardHeader className="flex-col items-start">
									<div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg mb-4 flex items-center justify-center">
										<Icon
											icon="mdi:account-group"
											className="w-6 h-6 text-white"
										/>
									</div>
									<h3 className="text-xl font-bold text-white mb-2">
										Team Collaboration
									</h3>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-gray-300">
										Work together seamlessly with your team in real-time.
									</CardDescription>
								</CardContent>
							</Card>

							<Card className="bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all">
								<CardHeader className="flex-col items-start">
									<div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-500 rounded-lg mb-4 flex items-center justify-center">
										<Icon
											icon="mdi:shield-lock"
											className="w-6 h-6 text-white"
										/>
									</div>
									<h3 className="text-xl font-bold text-white mb-2">
										Secure & Private
									</h3>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-gray-300">
										Your websites are encrypted and secure with enterprise-grade
										security.
									</CardDescription>
								</CardContent>
							</Card>
						</section>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="border-t border-white/10 py-8 px-4 mt-20">
				<div className="max-w-7xl mx-auto text-center text-gray-400">
					<p>&copy; 2025 ACME. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
