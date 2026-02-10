# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 16 template featuring Hero UI v3 components and Better Auth for authentication. Built with React 19, TypeScript, and Tailwind CSS 4.

## Development Commands

```bash
# Install dependencies (use pnpm, not npm)
pnpm install

# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint and format check
pnpm lint

# Lint and auto-fix issues
pnpm lint:fix

# Format code
pnpm format
```

**Note:** This project uses pnpm as the package manager, not npm or yarn.

## Environment Variables

Required in `.env.local`:

```bash
GITHUB_CLIENT_ID=           # GitHub OAuth App client ID
GITHUB_CLIENT_SECRET=       # GitHub OAuth App client secret
NEXT_PUBLIC_BASE_URL=       # Base URL (http://localhost:3000 for dev)
VERCEL_URL=                 # Vercel deployment URL (auto-set on Vercel)
```

## Authentication Architecture

This project uses **Better Auth** for authentication with the following structure:

### Server-Side Auth ([app/lib/auth.ts](app/lib/auth.ts))
- Main authentication instance created with `betterAuth()`
- Configured with GitHub OAuth provider
- Uses `trustedOrigins` for CORS configuration

### Client-Side Auth ([app/lib/auth-client.ts](app/lib/auth-client.ts))
- React client created with `createAuthClient()` from `better-auth/react`
- Used in components to handle auth state and actions

### API Routes ([app/api/auth/[...all]/route.ts](app/api/auth/[...all]/route.ts))
- Catch-all route handler for Better Auth
- Exports POST and GET handlers using `toNextJsHandler(auth)`
- Handles OAuth callbacks and session management

### Adding Social Providers
Edit [app/lib/auth.ts](app/lib/auth.ts) and add to `socialProviders`:
```typescript
socialProviders: {
    github: { ... },
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
}
```

## Code Quality

This project uses **Biome** for linting and formatting (not ESLint/Prettier).

- Configuration: [biome.json](biome.json)
- Formatter: Tabs for indentation, double quotes
- Linter: Recommended rules enabled
- Auto-organizes imports on save
- Git integration enabled (respects .gitignore)

## Tech Stack Specifics

### Hero UI v3 (Beta)
- Component library imported from `@heroui/react`
- Styles imported in [app/globals.css](app/globals.css) via `@import "@heroui/styles"`
- Dark mode configured by default in [app/layout.tsx](app/layout.tsx) with `className="dark"` and `data-theme="dark"`
- Documentation: https://v3.heroui.com/

### Tailwind CSS 4
- Uses new `@import "tailwindcss"` syntax in globals.css
- Configured via [postcss.config.mjs](postcss.config.mjs)
- Custom theme variables should be defined using CSS custom properties

### Next.js 16 App Router
- Uses App Router (not Pages Router)
- TypeScript configured with path alias `@/*` mapping to root
- React 19 enabled

## Project Structure

```
app/
├── layout.tsx              # Root layout with metadata and fonts
├── page.tsx                # Landing page
├── globals.css             # Tailwind and Hero UI imports
├── components/             # React components
│   └── social-login.tsx    # Social login component
├── lib/                    # Library code
│   ├── auth.ts            # Better Auth server instance
│   └── auth-client.ts     # Better Auth client instance
└── api/
    └── auth/[...all]/     # Better Auth API routes
        └── route.ts
```

## Key Patterns

1. **Path Aliases**: Use `@/` prefix for imports from root (e.g., `import { auth } from "@/app/lib/auth"`)

2. **Authentication Flow**:
   - Server components use `auth` from [app/lib/auth.ts](app/lib/auth.ts)
   - Client components use `authClient` from [app/lib/auth-client.ts](app/lib/auth-client.ts)
   - OAuth callbacks handled automatically by Better Auth

3. **Styling**:
   - Hero UI components come with built-in styles
   - Tailwind utilities for custom styling
   - Dark mode enabled by default

4. **Fonts**: Geist Sans and Geist Mono loaded from next/font/google in layout

## Important Notes

- Hero UI v3 is in beta - check documentation for component API changes
- Better Auth requires both `trustedOrigins` in server and client configs to match
- GitHub OAuth callback URL must be: `{BASE_URL}/api/auth/callback/github`
