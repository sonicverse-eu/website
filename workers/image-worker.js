export default {
  async fetch(request, env, ctx) {
    // This example demonstrates using the Cloudflare Images "send_image" binding
    // as `env.IMAGES`. It overlays a small watermark image (from Assets or R2)
    // onto a main image and returns an AVIF response.

    // Replace these fetches with your actual image sources (Assets, R2, external URL)
    const watermarkResp = await env.ASSETS.fetch('/images/watermark.png');
    if (!watermarkResp.ok || !watermarkResp.body) return new Response('Missing watermark', { status: 404 });

    const imageResp = await fetch('https://example.com/path/to/main-image.jpg');
    if (!imageResp.ok || !imageResp.body) return new Response('Missing image', { status: 404 });

    // Use the Images binding to build the transformation pipeline
    const response = (
      await env.IMAGES.input(imageResp.body)
        .draw(
          env.IMAGES.input(watermarkResp.body).transform({ width: 32, height: 32 }),
          { bottom: 32, right: 32 }
        )
        .output({ format: 'image/avif' })
    ).response();

    return response;
  }
};
