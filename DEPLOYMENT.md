# Vercel Deployment Guide

## Prerequisites

1. Install [Bun](https://bun.sh/)
2. Install dependencies: `bun install`

## Development

### Local Development

```bash
bun run dev
```

This starts the Next.js development server on `http://localhost:3000`.

## Vercel Deployments

This repository uses Vercel for deployment and preview system.

- Pull requests are automatically previewed by Vercel.
- The `main` branch is automatically deployed to production.

## Production Deployment

### Build for Production

```bash
bun run build
```

### Start Production Server Locally

```bash
bun run start
```

## Configuration

### Environment Variables

Configure environment variables in the Vercel Dashboard under Project Settings > Environment Variables.

Required variables:

- `EMAIL_SENDER`: The email address that sends inquiries (e.g., `noreply@mail.sonicverse.tech`).
- `EMAIL_RECIPIENT`: The email address that receives inquiries (e.g., `hello@sonicverse.tech`).
- `RESEND_API_KEY`: API key for the Resend email service.

Optional variables:

- `NEXT_PUBLIC_SITE_URL`: The public URL of the website.
- `NEXT_PUBLIC_IMAGE_WORKER_URL`: Custom URL for image processing if applicable.

## Troubleshooting

### Clean Build

```bash
bun run clean
bun install
bun run build
```

## Useful Commands

- `bun run dev` - Starts the Next.js development server
- `bun run build` - Builds the Next.js app for production
- `bun run start` - Starts the production server
- `bun run lint` - Run ESLint
- `bun run clean` - Clean build artifacts
