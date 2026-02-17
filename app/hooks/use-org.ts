import { useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";

export default function useOrg() {
	const [org, setOrg] = useState<Awaited<
		ReturnType<typeof authClient.organization.getFullOrganization>
	> | null>(null);

	useEffect(() => {
		async function getOrg() {
			const { data } = await authClient.getSession();
			console.log("Session data in useOrg hook:", data);
			const userId = data?.user?.id;
			const org = await authClient.organization.getFullOrganization({
				query: {},
			});
			console.log("Organization data in useOrg hook:", org, "User ID:", userId);
			setOrg(org);
		}
		getOrg();
	}, []);

	return { org };
}
