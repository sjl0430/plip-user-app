export function isStubPresignedPutUrl(uploadUrl: string): boolean {
  return uploadUrl.includes("/stub-presigned-put/");
}

export type PresignedPutResult = "uploaded" | "skipped-stub";

export async function putPresignedUpload(
  uploadUrl: string,
  blob: Blob,
  contentType: string,
): Promise<PresignedPutResult> {
  if (isStubPresignedPutUrl(uploadUrl)) {
    // NoOp S3: HeadObject stub succeeds without uploading the blob body.
    return "skipped-stub";
  }

  const response = await fetch(uploadUrl, {
    method: "PUT",
    body: blob,
    headers: { "Content-Type": contentType },
  });

  if (!response.ok) {
    throw new Error(`Presigned PUT failed (${response.status})`);
  }

  return "uploaded";
}
