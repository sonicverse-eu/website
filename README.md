# Sonicverse Website

[![Cloudflare Worker Preview](https://github.com/sonicverse-eu/website/actions/workflows/cloudflare-preview.yml/badge.svg)](https://github.com/sonicverse-eu/website/actions/workflows/cloudflare-preview.yml)
![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?logo=next.js)
![React 19](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white)

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
npm run dev
```

## Deployment

Production deployments and pull request previews are handled by Cloudflare Workers Builds.

- `main` deploys through the connected Workers Builds integration.
- Pull requests rely on Cloudflare's native preview flow rather than a separate GitHub Actions workflow.
- GitHub Actions is used for commit-message hygiene via the `OpenCommit` workflow on non-protected branches.
- `wrangler.jsonc` enables `preview_urls` so version uploads can surface preview URLs.
- Non-production Workers Builds should upload preview versions with `npm run deploy:preview` rather than promote a full deployment with `npm run deploy`.

See [DEPLOYMENT.md](DEPLOYMENT.md) for the full deployment workflow and troubleshooting notes.

```bash
npm run build:worker
```

### Preview the Worker locally

```dotenv
EMAIL_SENDER = "noreply@mail.sonicverse.eu"
EMAIL_RECIPIENT = "hello@sonicverse.eu"
```

## Common Commands

| Command                | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Starts the Next.js development server.        |
| `npm run lint`         | Runs ESLint across the project.               |
| `npm run typecheck`    | Runs TypeScript in no-emit mode.              |
| `npm run build`        | Builds the Next.js app.                       |
| `npm run build:worker` | Builds the OpenNext Cloudflare Worker output. |
| `npm run preview`      | Builds and previews the Worker locally.       |
| `npm run deploy`       | Builds and deploys the Worker to Cloudflare.  |
| `npm run cf-typegen`   | Regenerates Cloudflare environment types.     |
| `npm run clean`        | Removes local build artifacts.                |

## Contributing

Contributions are welcome through GitHub Issues and Pull Requests. If you want to propose a bug fix, content change, or improvement to the site experience, start by checking the open issues or opening a new one with the context needed to reproduce the problem or explain the idea.

Contributor setup and workflow details live in [CONTRIBUTING.md](CONTRIBUTING.md). The short version is:

- keep changes focused and readable;
- run `npm run lint`, `npm run typecheck`, and `npm run build` before opening a PR;
- include screenshots or preview details when a change affects the UI or content presentation;
- use the existing Cloudflare preview workflow on pull requests as an extra validation step.

The repository also includes an `OpenCommit` GitHub Actions workflow that rewrites commit messages on push for non-protected branches. Protected branches such as `main`, `master`, `dev`, `development`, and `release` are excluded. Because the workflow rebases and force-pushes branch commits, commit SHAs can change after push. Repository maintainers must set the `MISTRAL_API_KEY` GitHub Actions secret for that automation to run successfully.

## Links

- Live site: [sonicverse.eu](https://sonicverse.eu)
- Repository: [github.com/sonicverse-eu/website](https://github.com/sonicverse-eu/website)
- GitHub organization: [github.com/sonicverse-eu](https://github.com/sonicverse-eu)
- Issues: [github.com/sonicverse-eu/website/issues](https://github.com/sonicverse-eu/website/issues)
- Contact: [hello@sonicverse.eu](mailto:hello@sonicverse.eu)
