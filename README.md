# Sonicverse Website

[![Cloudflare Worker Preview](https://github.com/sonicverse-eu/website/actions/workflows/cloudflare-preview.yml/badge.svg)](https://github.com/sonicverse-eu/website/actions/workflows/cloudflare-preview.yml)
![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?logo=next.js)
![React 19](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white)

Sonicverse Website is the public web presence for Sonicverse, built with Next.js App Router, MDX content, and Cloudflare Workers via OpenNext. It combines marketing pages, editorial content, and a contact workflow in a deployment setup designed for edge delivery.

## What's Inside

- Marketing and company pages built with the Next.js App Router.
- MDX-backed blog, changelog, and roadmap content.
- A contact flow that sends submissions through the configured email delivery path.
- Cloudflare-focused build, preview, and deployment scripts powered by OpenNext.

## Getting Started

### Prerequisites

- A recent Node.js LTS release and `npm`.
- A Cloudflare account plus Wrangler CLI if you want to preview or deploy the Worker build.

### Installation

```bash
npm install
```

### Environment Setup

Create the local environment files used by Next.js and the Cloudflare Worker preview:

```bash
cp .env.example .env.local
cp .dev.vars.example .dev.vars
```

Update the copied files with values that match your environment. The most important settings are:

- `EMAIL_SENDER` and `EMAIL_RECIPIENT` for contact form delivery.
- `NEXT_PUBLIC_SITE_URL` for canonical metadata in Worker preview and deployment environments.
- `NEXT_PUBLIC_IMAGE_WORKER_URL` if image requests should be served from a dedicated image worker URL.

If you use Cloudflare Email Workers bindings instead of direct provider credentials, keep `SEND_EMAIL` configured in the Worker environment as described in the existing comments inside [.env.example](./.env.example) and [.dev.vars.example](./.dev.vars.example).

### Local Development

Run the standard Next.js development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Cloudflare Worker Preview

Run the OpenNext Cloudflare preview flow when you want to test the Worker build locally:

```bash
npm run preview
```

For deployment-specific details, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Usage Examples

### Start the app locally

```bash
npm run dev
```

### Run the project checks

```bash
npm run lint
npm run typecheck
npm run build
```

### Build the Cloudflare Worker bundle

```bash
npm run build:worker
```

### Preview the Worker locally

```bash
npm run preview
```

### Deploy to Cloudflare

```bash
npm run deploy
```

## Common Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the Next.js development server. |
| `npm run lint` | Runs ESLint across the project. |
| `npm run typecheck` | Runs TypeScript in no-emit mode. |
| `npm run build` | Builds the Next.js app. |
| `npm run build:worker` | Builds the OpenNext Cloudflare Worker output. |
| `npm run preview` | Builds and previews the Worker locally. |
| `npm run deploy` | Builds and deploys the Worker to Cloudflare. |
| `npm run cf-typegen` | Regenerates Cloudflare environment types. |
| `npm run clean` | Removes local build artifacts. |

## Contributing

Contributions are welcome through GitHub Issues and Pull Requests. If you want to propose a bug fix, content change, or improvement to the site experience, start by checking the open issues or opening a new one with the context needed to reproduce the problem or explain the idea.

This repository does not currently ship a dedicated `CONTRIBUTING.md`, so the working expectation is:

- keep changes focused and readable;
- run `npm run lint`, `npm run typecheck`, and `npm run build` before opening a PR;
- include screenshots or preview details when a change affects the UI or content presentation;
- use the existing Cloudflare preview workflow on pull requests as an extra validation step.

## Links

- Live site: [sonicverse.eu](https://sonicverse.eu)
- Repository: [github.com/sonicverse-eu/website](https://github.com/sonicverse-eu/website)
- GitHub organization: [github.com/sonicverse-eu](https://github.com/sonicverse-eu)
- Issues: [github.com/sonicverse-eu/website/issues](https://github.com/sonicverse-eu/website/issues)
- Contact: [hello@sonicverse.eu](mailto:hello@sonicverse.eu)
