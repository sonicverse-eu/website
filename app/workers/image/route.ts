import { getCloudflareContext } from "@opennextjs/cloudflare";

type R2ObjectLike = {
  body: ReadableStream | null;
  httpEtag: string;
  writeHttpMetadata(headers: Headers): void;
};

type ImageAssetsBucket = {
  get(key: string): Promise<R2ObjectLike | null>;
};

const ALLOWED_ORIGIN_HOSTS = new Set<string>([
  "example.com",
  "www.example.com"
]);

function getValidatedOriginUrl(source: string): URL | null {
  try {
    const parsed = new URL(source);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return null;
    }
    if (!ALLOWED_ORIGIN_HOSTS.has(parsed.hostname)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

async function tryFetchFromR2(imageAssets: ImageAssetsBucket, key: string): Promise<Response | null> {
  try {
    console.log(`Trying R2 key: ${key}`);
    const object = await imageAssets.get(key);
    if (object) {
      console.log(`Found image in R2: ${key}`);
      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set("etag", object.httpEtag);
      headers.set("cache-control", "public, max-age=31536000, immutable");
      return new Response(object.body, { headers });
    } else {
      console.log(`Image not found in R2: ${key}`);
    }
  } catch (e) {
    console.error("R2 fetch error for key %s:", key, e);
  }
  return null;
}

async function tryFetchFromAssets(env: any, source: string): Promise<Response | null> {
  // Try different path variations for ASSETS
  const assetPaths = [
    source,
    `/${source.replace(/^\/+/, '')}`,
    source.replace(/^images\//, ""),
    source.replace(/^\/images\//, "")
  ];

  for (const assetPath of assetPaths) {
    try {
      console.log(`Trying ASSETS path: ${assetPath}`);
      const assetsResponse = await env.ASSETS.fetch(new Request(assetPath));
      if (assetsResponse.ok && assetsResponse.body) {
        console.log(`Found image in ASSETS: ${assetPath}`);
        const headers = new Headers(assetsResponse.headers);
        headers.set("cache-control", "public, max-age=31536000, immutable");
        return new Response(assetsResponse.body, { headers });
      }
    } catch (e) {
      console.error("Failed to fetch %s from ASSETS:", assetPath, e);
    }
  }
  return null;
}

export async function GET(request: Request) {
  const { env } = getCloudflareContext();
  const url = new URL(request.url);
  const source = url.searchParams.get("src");

  if (!source) {
    return new Response("Missing src parameter", { status: 400 });
  }

  console.log(`Image request for: ${source}`);

  // Clean up the source path by removing leading slashes
  const key = source.replace(/^\/+/, "");
  const imageAssets = (env as { IMAGE_ASSETS?: ImageAssetsBucket }).IMAGE_ASSETS;

  // Try R2 first with multiple path variations
  if (imageAssets) {
    const r2Paths = [
      key, // Original key
      key.replace(/^images\//, ""), // Remove images/ prefix
      key.replace(/^stock\//, ""), // Remove stock/ prefix
      key.replace(/^images\/stock\//, "") // Remove images/stock/ prefix
    ];

    for (const r2Path of r2Paths) {
      const response = await tryFetchFromR2(imageAssets, r2Path);
      if (response) return response;
    }
  } else {
    console.log("IMAGE_ASSETS binding not configured, falling back to ASSETS");
  }

  // Fallback to ASSETS
  const assetsResponse = await tryFetchFromAssets(env, source);
  if (assetsResponse) return assetsResponse;

  // Final fallback - try to fetch from allowed origin only
  const validatedOriginUrl = getValidatedOriginUrl(source);
  if (!validatedOriginUrl) {
    return new Response("Invalid src URL", { status: 400 });
  }

  try {
    console.log(`Trying origin fetch for: ${validatedOriginUrl.toString()}`);
    const originResponse = await fetch(validatedOriginUrl.toString());
    if (originResponse.ok) {
      console.log(`Found image at origin: ${validatedOriginUrl.toString()}`);
      const headers = new Headers(originResponse.headers);
      headers.set("cache-control", "public, max-age=31536000, immutable");
      return new Response(originResponse.body, { headers });
    }
  } catch (e) {
    console.error("Origin fetch error:", e);
  }

  console.log(`Image not found: ${source}, tried R2 key: ${key}`);
  return new Response(`Image not found: ${source}`, { status: 404 });
}