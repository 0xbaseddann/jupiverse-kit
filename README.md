# Jupiverse Kit

[Jupiverse Kit](https://www.npmjs.com/package/jupiverse-kit) is the ultimate ready-to-use React components library powered by Jupiter's APIs and packages for building onchain applications on Solana effortlessly.

The purpose of `jupiverse-kit` is to simplify and unify Jupiter's powerful open-source packages into a single cohesive library, offering a suite of reusable components and hooks that can be seamlessly integrated into your existing projects.

## Features

- 🏄🏻‍♂️ **Jupiverse Kit Provider** - Wrap your application in the `<JupiverseKitProvider />` to fully leverage the power of Solana, along with Jupiter’s APIs and packages.
- 👛 **Unified Wallet Kit** - Access every wallet on Solana all in one place with the `<UnifiedWalletButton />`.
- 🦍 **Swap Component** - A fully customisable plug-and-play `<Swap />` component leveraging Jupiter's V1 APIs.
- 🦋 **Terminal** - Lightweight Jupiter Terminal swap components with multiple display modes, consisting of `<IntegratedTerminal />`, `<WidgetTerminal />`, and `<ModalTerminal />`.

## Installation

```bash
npm install jupiverse-kit
```

## Styling Setup

On top of using your own CSS framework, the SDK also mainly uses Tailwind CSS for styling. Follow these steps to set up styling in your project:

1. Install required dependencies:

```bash
npm install -D tailwindcss postcss autoprefixer tailwindcss-animate
```

2. Import the SDK's CSS in your app's entry point (e.g., app.tsx, index.tsx, or layout.tsx):

```tsx
import "jupiverse-kit/dist/styles.css";
```

## Usage

Refer to the [web](https://github.com/dannweeeee/jupiverse-kit/tree/main/web) example to get started. *Documentation for Jupiverse Kit coming soon.*

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
