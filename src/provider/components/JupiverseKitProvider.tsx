import React from "react";

import {
  ConnectionProvider,
  UnifiedWalletProvider,
} from "@jup-ag/wallet-adapter";

import { IUnifiedWalletProvider } from "../utils/interfaces";

import { useAllWallets } from "../hooks/useAllWallets";

import { toast } from "sonner";

export function JupiverseKitProvider({
  children,
  autoConnect = true,
  env = "mainnet-beta",
  endpoint = "",
  walletConnectProjectId = "",
  metadata = {
    name: "Jupiverse Kit Unified Wallet",
    description: "Jupiverse Kit Unified Wallet",
    url: "https://jupiversekit.vercel.app",
    iconUrls: ["https://jupiversekit.vercel.app/favicon.ico"],
  },
  theme = "light",
  lang = "en",
  wallets: customWallets,
}: IUnifiedWalletProvider) {
  const defaultWallets = useAllWallets(metadata, walletConnectProjectId);
  const wallets = customWallets || defaultWallets;

  return (
    <ConnectionProvider endpoint={endpoint}>
      <UnifiedWalletProvider
        wallets={wallets}
        config={{
          autoConnect,
          env,
          metadata: {
            name: metadata.name,
            description: metadata.description,
            url: metadata.url,
            iconUrls: metadata.iconUrls,
          },
          notificationCallback: {
            onConnect: (props) =>
              toast.success(
                <div className="flex flex-col bg-green-100 w-full p-4">
                  <span className="font-semibold">Wallet Connected</span>
                  <span className="text-xs text-black/50">{`Connected to wallet ${props.shortAddress}`}</span>
                </div>,
                {
                  style: {
                    padding: 0,
                    margin: 0,
                  },
                }
              ),
            onConnecting: (props) =>
              toast.message(
                <div className="flex flex-col p-4">
                  <span className="font-semibold">
                    Connecting to {props.walletName}
                  </span>
                </div>,
                {
                  style: {
                    padding: 0,
                    margin: 0,
                  },
                }
              ),
            onDisconnect: (props) =>
              toast.message(
                <div className="flex flex-col p-4">
                  <span className="font-semibold">
                    Disconnected from {props.walletName}
                  </span>
                  <span className="text-xs text-black/50">{`Disconnected from wallet ${props.shortAddress}`}</span>
                </div>,
                {
                  style: {
                    padding: 0,
                    margin: 0,
                  },
                }
              ),
            onNotInstalled: (props) =>
              toast.error(
                <div className="flex flex-col bg-red-100 w-full p-4">
                  <span className="font-semibold">
                    {props.walletName} Wallet is not installed
                  </span>
                  <span>
                    {`Please go to the provider`}{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-bold"
                      href={props.metadata.url}
                    >
                      {`website`}
                    </a>{" "}
                    {`to download.`}
                  </span>
                </div>,
                {
                  style: {
                    padding: 0,
                    margin: 0,
                  },
                }
              ),
          },
          theme,
          lang,
        }}
      >
        {children}
      </UnifiedWalletProvider>
    </ConnectionProvider>
  );
}
