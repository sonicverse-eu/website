import { getCloudflareContext } from "@opennextjs/cloudflare";

type R2ObjectLike = {
  body: ReadableStream | null;
  httpEtag: string;
  writeHttpMetadata(headers: Headers): void;
};

type ImageAssetsBucket = {
  get(key: string): Promise<R2ObjectLike | null>;
};

export async function GET(request: Request) {
  const { env } = getCloudflareContext();
  const url = new URL(request.url);
  const source = url.searchParams.get("src");

  if (!source) {
    return new Response("Missing src", { status: 400 });
  }

  const key = source.replace(/^\/+/, "");
  const imageAssets = (env as { IMAGE_ASSETS?: ImageAssetsBucket }).IMAGE_ASSETS;

  // Try R2 first
  if (imageAssets) {
    const object = await imageAssets.get(key);
    if (object) {
      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set("etag", object.httpEtag);
      headers.set("cache-control", "public, max-age=31536000, immutable");
      return new Response(object.body, { headers });
    }
  }

  // Fallback to ASSETS if R2 is not configured or image not found
  try {
    const assetsResponse = await env.ASSETS.fetch(new Request(source));
    if (assetsResponse.ok) {
      const headers = new Headers(assetsResponse.headers);
      headers.set("cache-control", "public, max-age=31536000, immutable");
      return new Response(assetsResponse.body, { headers });
    }
  } catch (e) {
    console.error("Failed to fetch from ASSETS:", e);
  }

  // Final fallback - try to fetch from origin
  try {
    const originResponse = await fetch(source);
    if (originResponse.ok) {
      const headers = new Headers(originResponse.headers);
      headers.set("cache-control", "public, max-age=31536000, immutable");
      return new Response(originResponse.body, { headers });
    }
  } catch (e) {
    console.error("Failed to fetch from origin:", e);
  }

  return new Response("Image not found", { status: 404 });
}