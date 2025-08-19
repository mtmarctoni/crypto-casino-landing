# Crypto Casino Landing Page

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/mtmarctonis-projects/crypto-casino-landing)

## Tech Stack & Architecture

- **Framework:** [Next.js](https://nextjs.org/) (App Router, SSR, API routes)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (strict typing, interfaces)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (utility-first, custom config)
- **Wallet Integration:** [wagmi](https://wagmi.sh/) (hooks, connectors for MetaMask, WalletConnect, Coinbase Wallet, Injected)
- **State Management:** React hooks, context providers
- **UI Components:** Modular, reusable components in `/components/ui` (accordion, dialog, toast, table, etc.)
- **Custom Hooks:** `/hooks` for wallet connection, mobile detection, etc.
- **Type Definitions:** Centralized in `/types` for games, features, wallet options
- **Utility Functions:** Shared helpers in `/lib/utils.ts`
- **Config:** Wagmi config in `/lib/wagmi-config.ts` (multi-chain, WalletConnect project ID)
- **Assets:** SVG/PNG icons and placeholders in `/public/icons` and `/public`

## Developer Features

- **Hot Reloading:** Fast local development with `pnpm dev`
- **Environment Variables:** Secure config for WalletConnect and chains
- **Extensible UI:** Easily add new games, features, or wallet providers
- **Accessibility:** Semantic HTML, keyboard navigation, focus management
- **Responsive Design:** Mobile-first layouts, adaptive components
- **Custom Theming:** Theme provider for dark/light mode
- **Type Safety:** End-to-end TypeScript for reliability
- **Testing Ready:** Modular structure for easy test integration

## Deployment

Live at: [https://crypto-casino-landing.vercel.app/](https://crypto-casino-landing.vercel.app/)

## Getting Started

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Set up environment variables (see `lib/wagmi-config.ts`)
4. Run locally: `pnpm dev`

---

For questions or contributions, open an issue or pull request.
