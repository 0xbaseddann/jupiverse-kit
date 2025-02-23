"use client";

import { JupiverseKitProvider } from "jupiverse-kit";
import { useTheme } from "next-themes";

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <JupiverseKitProvider
      endpoint={process.env.NEXT_PUBLIC_RPC_URL as string}
      theme={theme as "light" | "dark" | "jupiter"}
      autoConnect={true}
      lang="en"
      env="mainnet-beta"
      walletConnectProjectId={process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}
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
}
