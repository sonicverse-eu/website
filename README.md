# Sonicverse Website

A Next.js application optimized for Cloudflare Workers deployment using OpenNext.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the Next.js development server:

```bash
npm run dev
```

Preview the production Worker locally:

```bash
npm run preview
```

Deploy the Worker manually:

```bash
npm run deploy
```

## Deployment

Production deployments and pull request previews are handled by Cloudflare Workers Builds.

- `main` deploys through the connected Workers Builds integration.
- Pull requests rely on Cloudflare's native preview flow rather than a separate GitHub Actions workflow.
- `wrangler.jsonc` enables `preview_urls` so Workers Builds can surface preview URLs for version uploads.

See [DEPLOYMENT.md](DEPLOYMENT.md) for the full deployment workflow and troubleshooting notes.

## Environment Variables

Copy `.dev.vars.example` to `.dev.vars` and configure:

```dotenv
EMAIL_SENDER = "Sonicverse <hello@sonicverse.eu>"
EMAIL_RECIPIENT = "hello@sonicverse.eu"
```

## License

MIT
