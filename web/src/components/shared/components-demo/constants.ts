export type Tabs =
  | "JupiverseKitProvider"
  | "UnifiedWalletKit"
  | "Terminal"
  | "Swap";

export const JUPIVERSEKIT_DEMO_TABS = [
  "JupiverseKitProvider",
  "UnifiedWalletKit",
  "Swap",
  "Terminal",
];

export const COMPONENT_DESCRIPTIONS: Record<string, string> = {
  JupiverseKitProvider:
    "Wrap your application in the <JupiverseKitProvider /> to fully leverage the power of Solana, along with Jupiter's APIs and packages.",
  UnifiedWalletKit:
    "Access every wallet on Solana all in one place with the <UnifiedWalletButton /> component for a seamless connection experience.",
  Swap: "A fully customizable plug-and-play <Swap /> component leveraging Jupiter's latest APIs and packages for token swapping functionality.",
  Terminal:
    "A lite version of Jupiter that provides end-to-end swap flow. Comes with multiple display modes.",
};

export const codeStyles = `
.code-snippet::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
.code-snippet::-webkit-scrollbar-track {
  background: transparent;
}
.code-snippet::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}
.code-snippet::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
.code-snippet {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
}
/* Default theme (light) */
.shiki,
.shiki span {
  color: var(--shiki-light) !important;
  background-color: var(--shiki-light-bg) !important;
  font-style: var(--shiki-light-font-style) !important;
  font-weight: var(--shiki-light-font-weight) !important;
  text-decoration: var(--shiki-light-text-decoration) !important;
}
/* Dark theme overrides */
.dark .shiki,
.dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}
`;

export const codeSnippets: Record<string, any> = {
  JupiverseKitProvider: `"use client";

import { JupiverseKitProvider } from "jupiverse-kit";
import { Connection } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

export function WalletProvider({ children }) {
  const connection = new Connection(process.env.RPC_URL);
  const wallet = useWallet();

  return (
    <JupiverseKitProvider
      endpoint={process.env.RPC_URL}
      theme={jupiter}
      autoConnect={true}
      lang="en"
      env="mainnet-beta"
      walletConnectProjectId={process.env.WALLET_CONNECT_PROJECT_ID}
      metadata={{
        name: "Jupiverse Kit",
        description: "Jupiverse Kit",
        url: "https://jupiversekit.vercel.app",
        iconUrls: ["https://jupiversekit.vercel.app/favicon.ico"],
      }}
    >
      {children}
    </JupiverseKitProvider>
  );
}`,
  UnifiedWalletKit: `"use client";

import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";
import { WalletIcon } from "lucide-react";

const WalletPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <UnifiedWalletButton
        buttonClassName={className}
        currentUserClassName={className}
      />
    </div>
  );
}`,
  Terminal: {
    IntegratedTerminal: `"use client";

import { IntegratedTerminal } from "jupiverse-kit";

const IntegratedTerminalPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <IntegratedTerminal />
    </div>
  );
}`,
    WidgetTerminal: `"use client";

import { WidgetTerminal } from "jupiverse-kit";

const WidgetTerminalPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <WidgetTerminal />
    </div>
  );
}`,
    ModalTerminal: `"use client";

import { ModalTerminal } from "jupiverse-kit";

const ModalTerminalPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <ModalTerminal />
    </div>
  );
}`,
  },
  Swap: `"use client";

import { Swap } from "jupiverse-kit";

const SwapPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Swap />
    </div>
  );
}`,
};

export const componentDemoCode: Record<string, any> = {
  JupiverseKitProvider: `There is no demo for this component.`,
  UnifiedWalletKit: `<UnifiedWalletButton
        buttonClassName="font-sans font-semibold rounded-3xl px-4 py-3 text-sm flex justify-center items-center text-center gap-2 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-white dark:text-white cursor-pointer"
        currentUserClassName="font-sans font-semibold min-w-[90px] min-h-[50px] rounded-full px-5 py-3 text-sm flex justify-center items-center text-center gap-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-white dark:text-white cursor-pointer"
        overrideContent={
          <>
            <WalletIcon className="h-4 w-4 opacity-70 cursor-pointer" />
            Connect Wallet
          </>
        }
      />`,
  Terminal: {
    IntegratedTerminal: `<IntegratedTerminal
                rpcUrl={process.env.NEXT_PUBLIC_RPC_URL}
                onSuccess={({ txid, swapResult }) => {
                  console.log("Swap successful:", txid);
                  toast.success("Swap successful: " + txid);
                }}
                onSwapError={({ error }) => {
                  toast.error(
                    "Error: "An unknown error occurred"
                  );
                }}
                containerStyles={{
                  zIndex: 100,
                  width: "400px",
                  height: "568px",
                  display: "flex",
                }}
              />`,
    WidgetTerminal: `<WidgetTerminal
              key={key}
              rpcUrl={process.env.NEXT_PUBLIC_RPC_URL}
              widgetPosition={position}
              widgetSize="default"
              onSuccess={({ txid, swapResult }) => {
                console.log("Swap successful:", txid);
                toast.success("Swap successful: " + txid);
              }}
              onSwapError={({ error }) => {
                toast.error(
                  "Error: An unknown error occurred"
                );
              }}
            />`,
    ModalTerminal: ` <ModalTerminal
              rpcUrl={process.env.NEXT_PUBLIC_RPC_URL}
              buttonText="Launch Modal Terminal"
              buttonClassName="bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-3xl flex items-center justify-center w-full sm:w-[200px] md:w-[250px] h-[100px] relative mt-6"
              onSuccess={({ txid, swapResult }) => {
                console.log("Swap successful:", txid);
                toast.success("Swap successful: " + txid);
              }}
              onSwapError={({ error }) => {
                toast.error(
                  "Error: An unknown error occurred"
                );
              }}
            />`,
  },
};
