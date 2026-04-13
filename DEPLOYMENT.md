# Cloudflare Workers Deployment Guide

## Prerequisites

1. Install [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
2. Install [Node.js](https://nodejs.org/) (v18+ recommended)
3. Install dependencies: `npm install`

## Development

### Local Development

```bash
npm run dev
```

This starts the Next.js development server on `http://localhost:3000`.

### Preview with Cloudflare Workers

```bash
npm run preview
```

This builds the worker and starts a local Cloudflare Workers environment using OpenNext preview.

## Cloudflare Workers Builds

This repository uses Cloudflare Workers Builds as the single deployment and preview system.

- Pull requests are previewed through the existing Cloudflare Git integration for `sonicverse-website`.
- `wrangler.jsonc` sets `preview_urls` to `true` so uploaded Worker versions can expose preview URLs.
- The non-production branch trigger should use `npm run deploy:preview`, which runs `wrangler versions upload`.
- There is no separate GitHub Actions preview workflow to maintain.

When a pull request updates successfully, GitHub should show the native Cloudflare Workers status for the connected Worker. A direct preview URL is only expected when the preview trigger uploads a Worker version instead of performing a full `wrangler deploy`.

## Production Deployment

### Build for Production

```bash
npm run build:worker
```

### Deploy to Cloudflare

```bash
npm run deploy
```

This is the manual Wrangler path. The default production path for merged changes remains the connected Cloudflare Workers Builds integration.

### Upload a Preview Version

```bash
npm run build:worker
npm run deploy:preview
```

Use this for manual preview-version uploads. It creates a version preview instead of promoting production traffic.

### Preview Production Build Locally

```bash
npm run preview
```

## Configuration

### Environment Variables

Create `.dev.vars` for local development and `.prod.vars` for production. Example:

```
# Email configuration
EMAIL_SENDER = "noreply@mail.sonicverse.eu"
EMAIL_RECIPIENT = "hello@sonicverse.eu"

# Environment
NODE_ENV = "development"
```

### Secrets

For sensitive data, use Cloudflare Workers secrets:

```bash
wrangler secret put EMAIL_SENDER
wrangler secret put EMAIL_RECIPIENT
```

## Optimizations Applied

1. **Edge Runtime**: Configured for Cloudflare Workers edge execution
2. **Caching**: Configure caching at the Cloudflare dashboard level (Cache Rules)
3. **Minification**: Enabled code minification via Next.js
4. **Tree Shaking**: Automatic via Next.js build process
5. **Image Optimization**: Configured for Cloudflare Images
6. **Observability**: Enabled logging and tracing in wrangler.jsonc
7. **Type Safety**: Added Cloudflare environment types

## Troubleshooting

### Clean Build

```bash
npm run clean
npm install
npm run build:worker
```

### Type Generation

```bash
npm run cf-typegen
```

### Check Wrangler Version

```bash
wrangler --version
```

## Useful Commands

- `npm run build:worker` - Build the OpenNext Worker bundle
- `npm run preview` - Preview the built Worker locally
- `npm run deploy` - Manually deploy the Worker with Wrangler
- `npm run deploy:preview` - Upload a preview Worker version with Wrangler
- `npm run lint` - Run ESLint
- `npm run clean` - Clean build artifacts
