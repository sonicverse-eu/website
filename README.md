# Sonicverse Website

![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?logo=next.js)
![React 19](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

## Getting Started

Install dependencies:

```bash
bun install
```

Run the Next.js development server:

```bash
bun run dev
```

Build and start the production server locally:

```bash
bun run build
bun run start
```

## Deployment

Production deployments and pull request previews are handled by Vercel.

- `main` deploys to production on every push.
- Pull requests automatically generate preview deployments.

See [DEPLOYMENT.md](DEPLOYMENT.md) for the full deployment workflow.

## Common Commands

| Command             | What it does                           |
| ------------------- | -------------------------------------- |
| `bun run dev`       | Starts the Next.js development server. |
| `bun run lint`      | Runs ESLint across the project.        |
| `bun run typecheck` | Runs TypeScript in no-emit mode.       |
| `bun run build`     | Builds the Next.js app for production. |
| `bun run start`     | Starts the production server.          |
| `bun run format`    | Formats code with Prettier.            |
| `bun run clean`     | Removes local build artifacts.         |

## Contributing

Contributions are welcome through GitHub Issues and Pull Requests. If you want to propose a bug fix, content change, or improvement to the site experience, start by checking the open issues or opening a new one with the context needed to reproduce the problem or explain the idea.

Contributor setup and workflow details live in [CONTRIBUTING.md](CONTRIBUTING.md). The short version is:

- keep changes focused and readable;
- run `bun run lint`, `bun run typecheck`, and `bun run build` before opening a PR;
- include screenshots or preview details when a change affects the UI or content presentation;
- use the Vercel preview deployment on pull requests as an extra validation step.

The repository also includes an `OpenCommit` GitHub Actions workflow that rewrites commit messages on push for non-protected branches. Protected branches such as `main`, `master`, `dev`, `development`, and `release` are excluded. Because the workflow rebases and force-pushes branch commits, commit SHAs can change after push. Repository maintainers must set the `MISTRAL_API_KEY` GitHub Actions secret for that automation to run successfully.

## Links

- Live site: [sonicverse.tech](https://sonicverse.tech)
- Repository: [github.com/sonicverse-eu/website](https://github.com/sonicverse-eu/website)
- GitHub organization: [github.com/sonicverse-eu](https://github.com/sonicverse-eu)
- Issues: [github.com/sonicverse-eu/website/issues](https://github.com/sonicverse-eu/website/issues)
- Contact: [hello@sonicverse.tech](mailto:hello@sonicverse.tech)
