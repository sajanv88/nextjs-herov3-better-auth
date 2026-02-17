import { useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";

type OrgType = Awaited<
	ReturnType<typeof authClient.organization.getFullOrganization>
>;
export default function useOrg() {
	const [org, setOrg] = useState<OrgType | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function getOrg() {
			try {
				const { data: session } = await authClient.getSession();
				console.log("Session data in useOrg hook:", session);
				const userId = session?.user?.id;

				// List all organizations the user belongs to
				const { data: organizations, error: listError } =
					await authClient.organization.list();

				console.log("Organizations list:", organizations, "Error:", listError);

				if (!organizations || organizations.length === 0) {
					console.log("No organizations found for user:", userId);
					setOrg(null);
					setIsLoading(false);
					return;
				}

				// Get the first organization (or you could let user choose)
				const firstOrg = organizations[0];

				// Set it as active for future calls
				await authClient.organization.setActive({
					organizationId: firstOrg.id,
				});

				// Now get the full organization data
				const { data: orgData, error: orgError } =
					await authClient.organization.getFullOrganization({
						query: {
							organizationId: firstOrg.id,
						},
					});

				if (orgError) {
					throw orgError;
				}
				setOrg(orgData ?? null);
			} catch (error) {
				console.error("Error fetching organization:", error);
				setOrg(null);
			} finally {
				setIsLoading(false);
			}
		}
		getOrg();
	}, []);

	return { org, isLoading };
}
