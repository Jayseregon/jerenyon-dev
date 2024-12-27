"use server";

import sharp from "sharp";

import { sanitizeFileName } from "@/src/lib/actionHelpers";

// const BUNNY_REGION = "";
const BUNNY_HOSTNAME = "storage.bunnycdn.com";
const BUNNY_STORAGE_ZONE_NAME = process.env.BUNNY_STORAGE_ZONE_NAME!;
const BUNNY_API_ACCESS_KEY = process.env.BUNNY_API_ACCESS_KEY!;
const BUNNY_PULL_ZONE_URL = process.env.BUNNY_PULL_ZONE_URL!;

export async function uploadImageToBunny(
  fileBuffer: ArrayBuffer,
  fileName: string,
): Promise<string> {
  const sanitizedBase = sanitizeFileName(fileName);
  const finalName = `${sanitizedBase}.webp`;

  const webpBuffer = await sharp(Buffer.from(fileBuffer))
    .webp({ quality: 80 })
    .toBuffer();

  const url = `https://${BUNNY_HOSTNAME}/${BUNNY_STORAGE_ZONE_NAME}/blog-posts/${finalName}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      AccessKey: BUNNY_API_ACCESS_KEY,
      "Content-Type": "application/octet-stream",
    },
    body: webpBuffer,
  });

  if (!res.ok) {
    throw new Error("Failed to upload file to Bunny: " + (await res.text()));
  }

  // Return public URL from your Bunny Pull Zone
  return `${BUNNY_PULL_ZONE_URL}blog-posts/${finalName}`;
}

export async function uploadCoverImageToBunny(
  fileBuffer: ArrayBuffer,
  fileName: string,
): Promise<string> {
  const sanitizedBase = sanitizeFileName(fileName);
  const finalName = `${sanitizedBase}.webp`;

  const webpBuffer = await sharp(Buffer.from(fileBuffer))
    .webp({ quality: 80 })
    .toBuffer();

  const url = `https://${BUNNY_HOSTNAME}/${BUNNY_STORAGE_ZONE_NAME}/cover-images/${finalName}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      AccessKey: BUNNY_API_ACCESS_KEY,
      "Content-Type": "application/octet-stream",
    },
    body: webpBuffer,
  });

  if (!res.ok) {
    throw new Error("Failed to upload cover image to Bunny");
  }

  return `${BUNNY_PULL_ZONE_URL}cover-images/${finalName}`;
}

export async function deleteImageFromBunny(fileName: string): Promise<boolean> {
  const url = `https://${BUNNY_HOSTNAME}/${BUNNY_STORAGE_ZONE_NAME}/blog-posts/${fileName}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      AccessKey: BUNNY_API_ACCESS_KEY,
    },
  });

  if (!res.ok) {
    console.error("Failed to delete file from Bunny:", await res.text());

    return false;
  }

  return true;
}

export async function deleteCoverImageFromBunny(
  fileName: string,
): Promise<boolean> {
  const url = `https://${BUNNY_HOSTNAME}/${BUNNY_STORAGE_ZONE_NAME}/cover-images/${fileName}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      AccessKey: BUNNY_API_ACCESS_KEY,
    },
  });

  if (!res.ok) {
    console.error("Failed to delete cover image from Bunny:", await res.text());

    return false;
  }

  return true;
}
