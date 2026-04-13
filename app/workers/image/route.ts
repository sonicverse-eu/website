import { getCloudflareContext } from "@opennextjs/cloudflare";

const ORIGIN_BASE_URL = new URL("https://example.com");

function getValidatedOriginUrl(source: string): URL | null {
  const trimmed = source.trim();
  if (!trimmed) return null;

  // Only allow relative paths for origin fallback.
  // Reject absolute and protocol-relative URLs.
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed) || trimmed.startsWith("//")) {
    return null;
  }

  let decoded: string;
  try {
    decoded = decodeURIComponent(trimmed);
  } catch {
    return null;
  }

  const normalized = decoded.replace(/^\/+/, "");
  if (!normalized) return null;

  // Disallow control chars, backslashes, query/fragment injection.
  if (/[\u0000-\u001F\u007F\\?#]/.test(normalized)) {
    return null;
  }

  const segments = normalized.split("/");
  // Prevent traversal and require safe path segments only.
  if (
    segments.some(
      (segment) =>
        !segment ||
        segment === "." ||
        segment === ".." ||
        !/^[A-Za-z0-9._-]+$/.test(segment),
    )
  ) {
    return null;
  }

  // Restrict to known image directories.
  if (
    !(
      normalized.startsWith("images/") ||
      normalized.startsWith("stock/") ||
      normalized.startsWith("images/stock/")
    )
  ) {
    return null;
  }

  // Restrict to expected image file extensions.
  if (!/\.(?:png|jpe?g|webp|gif|svg|avif)$/i.test(normalized)) {
    return null;
  }

  return new URL(`/${normalized}`, ORIGIN_BASE_URL);
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
    const originResponse = await fetch(validatedOriginUrl);
    if (originResponse.ok) {
      console.log(`Found image at origin: ${validatedOriginUrl.toString()}`);
      const headers = new Headers(originResponse.headers);
      headers.set("cache-control", "public, max-age=31536000, immutable");
      return new Response(originResponse.body, { headers });
    }
  } catch (e) {
    console.error("Origin fetch error:", e);
  }

  console.log(`Image not found: ${source}`);
  return new Response(`Image not found: ${source}`, { status: 404 });
}