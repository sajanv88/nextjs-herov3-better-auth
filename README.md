# Next.js 16 + Hero UI v3 + Better Auth Template

A modern, fully-configured Next.js template with the latest technologies for building beautiful, secure web applications.

## 🚀 Features

- **Next.js 16** - Latest version with App Router and React 19
- **Hero UI v3** - Beautiful, accessible UI components (beta)
- **Tailwind CSS 4** - Next-generation styling with enhanced performance
- **Better Auth** - Comprehensive authentication solution with social login
- **TypeScript** - Type-safe development experience
- **Iconify React** - Access to thousands of icons

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.0.8 | React framework |
| React | 19.2.1 | UI library |
| Hero UI | 3.0.0-beta.2 | Component library |
| Tailwind CSS | 4.x | Utility-first CSS |
| Better Auth | 1.4.6+ | Authentication |
| TypeScript | 5.x | Type safety |

## 📦 Getting Started

### Prerequisites

- Node.js 22+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd nextjs-herov3-better-auth
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
# Create .env.local file
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔐 Authentication Setup

This template comes with Better Auth pre-configured with GitHub OAuth.

### Setting up GitHub OAuth:

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set the callback URL to: `http://localhost:3000/api/auth/callback/github`
4. Copy the Client ID and Client Secret to your `.env.local` file

### Adding More Providers:

Edit `app/lib/auth.ts` to add more social providers:

```typescript
export const auth = betterAuth({
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
});
```

## 🎨 Hero UI Components

This template uses Hero UI v3 (beta). All components are wrapped in `HeroUIProvider` in `app/layout.tsx`.

Example usage:
```tsx
import { Button, Card, CardHeader } from "@heroui/react";

<Button variant="primary">Click me</Button>
<Card>
  <CardHeader>Title</CardHeader>
</Card>
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with HeroUIProvider
│   ├── page.tsx            # Home page with landing design
│   ├── globals.css         # Global styles
│   └── lib/
│       └── auth.ts         # Better Auth configuration
├── public/                 # Static assets
├── package.json            # Dependencies
└── tsconfig.json          # TypeScript config
```

## 🚀 Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## 🎯 What's Included

- ✅ Pre-configured Hero UI v3 with custom theme
- ✅ Better Auth with GitHub OAuth
- ✅ Responsive landing page example
- ✅ Tailwind CSS 4 with modern utilities
- ✅ TypeScript setup
- ✅ ESLint configuration
- ✅ Iconify integration for icons
- ✅ HTML5 semantic markup

## 📝 Customization

### Changing Colors

```css
/* Define in both light and dark themes */
:root, 
[data-theme="light"] {
  --info: oklch(0.6 0.15 210);
  --info-foreground: oklch(0.98 0 0);
}

.dark,
[data-theme="dark"] {
  --info: oklch(0.7 0.12 210);
  --info-foreground: oklch(0.15 0 0);
}

/* Make the color available to Tailwind */
@theme inline {
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
}

```
- [Theming](https://v3.heroui.com/docs/handbook/theming)

### Updating Metadata

Update `app/layout.tsx` to change page title and description:

```tsx
export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your app description",
};
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Hero UI Documentation](https://v3.heroui.com/)
- [Better Auth Documentation](https://better-auth.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Iconify Documentation](https://iconify.design)

## 💡 Tips

- Use Hero UI's built-in dark mode support
- Leverage Better Auth's session management
- Take advantage of Next.js 16's improved caching
- Explore Tailwind CSS 4's new features

---

Built with Hero UI ❤️ using the latest web technologies