# Contributing to Sonicverse Website

Thanks for your interest in contributing to the Sonicverse Website. This repository powers the Sonicverse public site and is built with Next.js 16, React 19, TypeScript, and Cloudflare Workers via OpenNext.

We welcome contributions that improve the site's content, polish, accessibility, performance, developer experience, and deployment workflow. Small, focused changes are the easiest to review and merge.

## Project Overview

This project is a Next.js App Router application deployed to Cloudflare Workers. The repository includes:

- Marketing and editorial pages built with the App Router
- MDX-backed content for the blog and other editorial sections
- Shared UI components and layout primitives
- Cloudflare/OpenNext configuration for preview and deployment

If you are unsure whether an idea is a good fit, open an issue first so we can discuss the scope before you invest time in implementation.

## Contact Points

- Use [GitHub Issues](https://github.com/sonicverse-eu/website/issues) for bug reports, feature proposals, and contributor questions that benefit from public discussion.
- Use [Pull Requests](https://github.com/sonicverse-eu/website/pulls) when you already have a scoped change ready to review.
- Email `hello@sonicverse.eu` for private, security-sensitive, or otherwise non-public concerns.

## Development Setup

1. Fork the repository and clone your fork locally.
2. Install dependencies:

```bash
npm install
```

3. Copy the local Worker variables example:

```bash
cp .dev.vars.example .dev.vars
```

4. Review `.env.example` for optional local configuration used by the image worker and contact/email flow.
5. Start the local development server:

```bash
npm run dev
```

6. If your change affects runtime behavior on Cloudflare Workers, validate it with:

```bash
npm run preview
```

Additional deployment and platform notes live in [DEPLOYMENT.md](DEPLOYMENT.md).

## Before You Propose Changes

- Open an issue first for non-trivial features, behavior changes, content model changes, or architectural work.
- You can open a pull request directly for small fixes, documentation improvements, typo fixes, and other narrowly scoped changes.
- Keep proposed changes aligned with the existing product direction and structure of the site.

## Pull Request Process

1. Create a focused branch from `main`.
2. Keep each pull request limited to one concern where possible.
3. Explain what changed, why it changed, and how you validated it.
4. Link the related issue when one exists.
5. Include screenshots or short recordings for visible UI changes.
6. Call out any environment variable, deployment, or Cloudflare-specific implications in the PR description.
7. Open the PR against `main`.

## Quality Checks

This repository does not currently maintain a dedicated automated test suite, so contributors should validate changes with the existing quality checks:

```bash
npm run lint
npm run typecheck
npm run build
```

For changes that may behave differently in the Cloudflare runtime, also run:

```bash
npm run preview
```

The repository also uses a Husky pre-commit hook that runs `lint-staged`, which formats staged files before commit.

## Code Style

- Prefer TypeScript and keep types explicit at component and data boundaries.
- Follow the existing Next.js App Router structure and patterns already used in `app/`, `components/`, and `lib/`.
- Keep components and files focused; avoid unrelated refactors in contribution PRs.
- Use the existing formatting and linting setup:

```bash
npm run format
npm run lint
```

- Preserve established naming, import aliasing, and file organization conventions unless the change explicitly updates project structure.

## Commit Message Conventions

This repository already uses Conventional Commit-style prefixes in its history. Please use the same style for new commits when possible, for example:

- `feat: add worker preview note to docs`
- `fix: correct contact form validation copy`
- `refactor: simplify content loading logic`
- `docs: add contribution setup steps`
- `chore: update tooling configuration`

Clear, scoped commit messages make review and release tracking easier.

## Code of Conduct

Until a repository-local code of conduct is added, contributors are expected to follow the spirit of the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

If you need to report unacceptable behavior or raise a concern privately, contact `hello@sonicverse.eu`.

## Additional Contribution Practices

- Update documentation when setup, behavior, or contributor workflows change.
- Do not commit secrets, API keys, `.dev.vars`, or other local-only environment files.
- Surface breaking changes or deployment-affecting changes early in the issue or PR discussion.
- Favor accessible, maintainable, and performance-conscious solutions over one-off fixes that increase complexity.

Thanks again for helping make the project easier to improve and maintain.
