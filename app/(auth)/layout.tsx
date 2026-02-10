/**
 * Auth Layout
 * Simple centered layout for login and registration pages
 */

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
			<div className="w-full max-w-md">{children}</div>
		</div>
	);
}
