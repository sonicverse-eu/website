# Sonicverse Website

A Next.js application optimized for Cloudflare Workers deployment using OpenNext.

## Features

- ✅ Next.js 16 with React 19
- ✅ Cloudflare Workers deployment
- ✅ OpenNext integration
- ✅ Optimized for edge runtime
- ✅ Email functionality via Cloudflare Workers
- ✅ R2 storage integration
- ✅ Cloudflare Images support

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Preview with Cloudflare Workers

```bash
npm run preview
```

### Deployment

```bash
npm run deploy
```

## Project Structure

- `app/` - Next.js app router pages
- `app/actions/` - Server actions
- `app/services/` - API routes
- `app/blog/` - Blog content
- `public/` - Static assets
- `.open-next/` - OpenNext build output
- `wrangler.jsonc` - Cloudflare Workers configuration
- `next.config.ts` - Next.js configuration
- `open-next.config.ts` - OpenNext configuration

## Configuration

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Environment Variables

Copy `.dev.vars.example` to `.dev.vars` and configure:

```
EMAIL_SENDER = "Sonicverse <hello@sonicverse.eu>"
EMAIL_RECIPIENT = "hello@sonicverse.eu"
```

## License

MIT