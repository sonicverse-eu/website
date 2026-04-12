import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(request: Request) {
  const { env } = getCloudflareContext();
  const url = new URL(request.url);
  const source = url.searchParams.get("src");

  if (!source) {
    return new Response("Missing src", { status: 400 });
  }

  const key = source.replace(/^\/+/, "");
  const object = await env.IMAGE_ASSETS.get(key);

  if (!object) {
    return new Response("Object not found", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");

  return new Response(object.body, { headers });
}