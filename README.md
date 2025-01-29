# Jupiverse Kit

[Jupiverse Kit](https://www.npmjs.com/package/jupiverse-kit) is the ultimate ready-to-use React components library powered by Jupiter's APIs for building onchain applications on Solana effortlessly.

The purpose of `jupiverse-kit` is to simplify and unify Jupiter's powerful open-source packages into a single cohesive library, offering a suite of reusable components and hooks that can be seamlessly integrated into your existing projects.

## Features

- 👛 Unified Wallet Provider - Easy wallet connection management powered by [Jupiter's Wallet Adapter](https://www.npmjs.com/package/@jup-ag/wallet-adapter)
- 🔄 Swap Component - A fully customisable plug-and-play <Swap /> component
- 🎣 Custom Hooks - Utility hooks built around Jupiter's APIs that are easy to use in your components

... many more features coming soon! 🚀

## Installation

```bash
npm install jupiverse-kit
```

## Styling Setup

The SDK uses Tailwind CSS for styling. Follow these steps to set up styling in your project:

1. Install required dependencies:

```bash
npm install -D tailwindcss postcss autoprefixer tailwindcss-animate
```

2. Import the SDK's CSS in your app's entry point (e.g., app.tsx, index.tsx, or layout.tsx):

```tsx
import "jupiverse-kit/dist/index.css";
```

3. Configure Tailwind CSS. Create or update your tailwind.config.js:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // Add this line to include the SDK's components
    "./node_modules/jupiverse-kit/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

4. Create or update your postcss.config.js:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

5. Add the base Tailwind directives to your global CSS file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Usage

### Jupiverse Kit Provider

Wrap your application with the Jupiverse Kit Provider:

1. Create `providers/wallet-provider.tsx` in your project

```tsx
"use client";

import { JupiverseKitProvider } from "jupiverse-kit";
import { useTheme } from "next-themes";

import { Connection } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const connection = new Connection(process.env.RPC_URL as string);
  const wallet = useWallet();
  const { theme } = useTheme();

  return (
    <JupiverseKitProvider
      endpoint={RPC_URL as string}
      theme={theme as "light" | "dark" | "jupiter"}
      autoConnect={true}
      lang="en"
      env="mainnet-beta"
      walletConnectProjectId={WALLET_CONNECT_PROJECT_ID}
      metadata={{
        name: "Jupiverse Kit Test",
        description: "Jupiverse Kit Test",
        url: "https://jupiversekit.vercel.app",
        iconUrls: ["https://jupiversekit.vercel.app/favicon.ico"],
      }}
    >
      {children}
    </JupiverseKitProvider>
  );
}
```

2. Wrap your application with the WalletProvider in your App:

```tsx
import { WalletProvider } from "@/providers/wallet-provider";

function App() {
  return <WalletProvider>{/* Your app content */}</WalletProvider>;
}
```

### Unified Wallet Button

```tsx
import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";

function YourComponent() {
  return <UnifiedWalletButton />;
}
```

### Swap Component

Add the swap interface to your application:

```tsx
import { Swap } from "jupiverse-kit";

function SwapPage() {
  return (
    <Swap
      rpcUrl={"YOUR_RPC_URL" || "https://api.mainnet-beta.solana.com"}
      referralKey={"YOUR_REFERRAL_KEY"}
      platformFeeBps={85}
      apiKey={"YOUR_API_KEY"}
    />
  );
}
```

## Requirements

- React && React DOM 16.8.0 or later
- @solana/web3.js 1.0.0 or later
- Node 20.18.0 or later

## Contributions

Contributions are welcome! Please feel free to submit a pull request.

### Thanks to all our contributors

<a href="https://github.com/dannweeeee/jupiverse-kit/graphs/contributors">
  <img src="CONTRIBUTORS.svg" alt="Contributors" />
</a>

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
