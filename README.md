# Jupiverse Kit

Jupiverse Kit is the ultimate ready-to-use React components library powered by Jupiter's APIs for building onchain applications on Solana effortlessly.

## Features

- 🔄 Swap Component - A fully functional token swap interface
- 👛 Wallet Components - Easy wallet connection management
- 🔔 Toast Components - Beautiful notifications system
- 🎣 Custom Hooks - Utility hooks for token balances, swaps, and more

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
import 'jupiverse-kit/dist/index.css';
```

3. Configure Tailwind CSS. Create or update your tailwind.config.js:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // Add this line to include the SDK's components
    "./node_modules/jupiverse-kit/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
}
```

4. Create or update your postcss.config.js:
```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

5. Add the base Tailwind directives to your global CSS file:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Usage

### Wallet Provider

Wrap your application with the WalletProvider:

```tsx
import { WalletProvider } from "jupiverse-kit";

function App() {
  return (
    <WalletProvider rpcUrl="YOUR_RPC_URL">
      {/* Your app content */}
    </WalletProvider>
  );
}
```

### Swap Component

Add the swap interface to your application:

```tsx
import { Swap } from "jupiverse-kit";

function SwapPage() {
  return <Swap rpcUrl="YOUR_RPC_URL" />;
}
```

### Toast Notifications

Set up the toast notification system:

```tsx
import { Toaster, useToast } from "jupiverse-kit";

function App() {
  return (
    <>
      <Toaster />
      {/* Your app content */}
    </>
  );
}

// Using toast notifications
function YourComponent() {
  const { toast } = useToast();

  const notify = () => {
    toast({
      title: "Success!",
      description: "Operation completed successfully",
      duration: 5000,
    });
  };

  return <button onClick={notify}>Show Notification</button>;
}
```

### Hooks

The library provides several useful hooks:

```tsx
import { useSwap, useTokenBalance, useTokens, useToast } from "jupiverse-kit";

function YourComponent() {
  // Get token list
  const { tokens } = useTokens();

  // Get token balance
  const { balance } = useTokenBalance(token);

  // Use swap functionality
  const { getQuote, executeSwap } = useSwap(rpcUrl);

  // Use toast notifications
  const { toast } = useToast();

  // ... rest of your component
}
```

## Components

### WalletConnectButton

```tsx
import { WalletConnectButton } from "jupiverse-kit";

function YourComponent() {
  return <WalletConnectButton />;
}
```

### SwapTokenButton

```tsx
import { SwapTokenButton } from "jupiverse-kit";

function YourComponent() {
  return <SwapTokenButton token={token} onClick={() => setDialogOpen(true)} />;
}
```

## Requirements

- React 16.8.0 or later
- @solana/web3.js 1.0.0 or later

## License

ISC
