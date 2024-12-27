"use server";

// const BUNNY_REGION = "";
const BUNNY_HOSTNAME = "storage.bunnycdn.com";
const BUNNY_STORAGE_ZONE_NAME = process.env.BUNNY_STORAGE_ZONE_NAME!;
const BUNNY_API_ACCESS_KEY = process.env.BUNNY_API_ACCESS_KEY!;
const BUNNY_PULL_ZONE_URL = process.env.BUNNY_PULL_ZONE_URL!;

export async function uploadImageToBunny(
  fileBuffer: ArrayBuffer,
  fileName: string,
): Promise<string> {
  const url = `https://${BUNNY_HOSTNAME}/${BUNNY_STORAGE_ZONE_NAME}/blog-posts/${fileName}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      AccessKey: BUNNY_API_ACCESS_KEY,
      "Content-Type": "application/octet-stream",
    },
    body: Buffer.from(fileBuffer),
  });

  console.log("Bunny response:", res);

  if (!res.ok) {
    throw new Error("Failed to upload file to Bunny: " + (await res.text()));
  }

  // Return public URL from your Bunny Pull Zone
  return `${BUNNY_PULL_ZONE_URL}blog-posts/${fileName}`;
}

export async function deleteImageFromBunny(fileName: string): Promise<boolean> {
  const url = `https://${BUNNY_HOSTNAME}/${BUNNY_STORAGE_ZONE_NAME}/blog-posts/${fileName}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      AccessKey: BUNNY_API_ACCESS_KEY,
    },
  });

  console.log("Bunny delete response:", res);

  if (!res.ok) {
    console.error("Failed to delete file from Bunny:", await res.text());

    return false;
  }

  return true;
}
