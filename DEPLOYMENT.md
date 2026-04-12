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

## Production Deployment

### Build for Production
```bash
npm run build:worker
```

### Deploy to Cloudflare
```bash
npm run deploy
```

### Preview Production Build Locally
```bash
npm run preview
```

## Configuration

### Environment Variables

Create `.dev.vars` for local development and `.prod.vars` for production. Example:

```
# Email configuration
EMAIL_SENDER = "Sonicverse <hello@sonicverse.eu>"
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
2. **Caching**: Optimized caching headers and strategies
3. **Minification**: Enabled code minification
4. **Tree Shaking**: Configured for dead code elimination
5. **Image Optimization**: Configured for Cloudflare Images
6. **Observability**: Enabled logging and tracing
7. **Type Safety**: Added Cloudflare environment types

## Troubleshooting

### Clean Build
```bash
npm run clean
npm install
npm run build
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

- `npm run optimize` - Build and generate types
- `npm run deploy:preview` - Deploy to preview environment
- `npm run lint` - Run ESLint
- `npm run clean` - Clean build artifacts