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
    return new Response("Missing src parameter", { status: 400 });
  }

  // Clean up the source path by removing leading slashes
  const key = source.replace(/^\/+/, "");
  const imageAssets = (env as { IMAGE_ASSETS?: ImageAssetsBucket }).IMAGE_ASSETS;

  // Try R2 first
  if (imageAssets) {
    try {
      const object = await imageAssets.get(key);
      if (object) {
        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("etag", object.httpEtag);
        headers.set("cache-control", "public, max-age=31536000, immutable");
        return new Response(object.body, { headers });
      }
    } catch (e) {
      console.error("R2 fetch error:", e);
    }
  } else {
    console.log("IMAGE_ASSETS binding not configured, falling back to ASSETS");
  }

  // Fallback to ASSETS if R2 is not configured or image not found
  try {
    // Try different path variations for ASSETS
    const assetPaths = [
      source, // Original path
      `/${key}`, // Ensure leading slash
      key.replace(/^images\//, ""), // Remove images/ prefix if present
    ];

    for (const assetPath of assetPaths) {
      try {
        const assetsResponse = await env.ASSETS.fetch(new Request(assetPath));
        if (assetsResponse.ok && assetsResponse.body) {
          const headers = new Headers(assetsResponse.headers);
          headers.set("cache-control", "public, max-age=31536000, immutable");
          return new Response(assetsResponse.body, { headers });
        }
      } catch (e) {
        console.error(`Failed to fetch ${assetPath} from ASSETS:", e);
      }
    }
  } catch (e) {
    console.error("ASSETS fetch error:", e);
  }

  // Final fallback - try to fetch from origin or public folder
  try {
    const originResponse = await fetch(source);
    if (originResponse.ok) {
      const headers = new Headers(originResponse.headers);
      headers.set("cache-control", "public, max-age=31536000, immutable");
      return new Response(originResponse.body, { headers });
    }
  } catch (e) {
    console.error("Origin fetch error:", e);
  }

  console.log(`Image not found: ${source}, tried key: ${key}`);
  return new Response(`Image not found: ${source}`, { status: 404 });
}