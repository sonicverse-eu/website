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

  if (!imageAssets) {
    return new Response("Image bucket binding is not configured", { status: 500 });
  }

  const object = await imageAssets.get(key);

  if (!object) {
    return new Response("Object not found", { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");

  return new Response(object.body, { headers });
}