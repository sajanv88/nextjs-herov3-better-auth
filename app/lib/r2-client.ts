/**
 * Cloudflare R2 Client Configuration
 * S3-compatible object storage for certificates, policies, and evidence files
 */

import { S3Client } from "@aws-sdk/client-s3";

// Initialize R2 client with S3-compatible API
export const r2Client = new S3Client({
	region: "auto", // R2 uses "auto" region
	endpoint: process.env.R2_ENDPOINT, // https://<account-id>.r2.cloudflarestorage.com
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID!,
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
	},
});

// R2 bucket name from environment
export const R2_BUCKET =
	process.env.R2_BUCKET_NAME || "dental-compliance-files";

/**
 * Generate R2 file path with practice isolation
 * Pattern: {bucket}/{type}/{practice_id}/{additional_path}
 */
export function getR2Path(
	type: "certificates" | "policies" | "evidence",
	practiceId: string,
	additionalPath: string,
): string {
	return `${type}/${practiceId}/${additionalPath}`;
}

/**
 * R2 path helpers for specific file types
 */
export const R2Paths = {
	certificate: (practiceId: string, staffId: string, certId: string) =>
		getR2Path("certificates", practiceId, `${staffId}/${certId}`),

	policy: (practiceId: string, policyId: string) =>
		getR2Path("policies", practiceId, `${policyId}`),

	evidence: (practiceId: string, taskInstanceId: string, filename: string) =>
		getR2Path("evidence", practiceId, `${taskInstanceId}/${filename}`),
};
