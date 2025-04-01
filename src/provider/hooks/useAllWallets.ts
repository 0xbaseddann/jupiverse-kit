import { useMemo } from "react";
import {
  BaseSignerWalletAdapter,
  BaseWalletAdapter,
  WalletAdapterNetwork,
} from "@solana/wallet-adapter-base";
import * as AllWalletAdapters from "@solana/wallet-adapter-wallets";
import { WalletAdapterWithMutableSupportedTransactionVersions } from "../utils/types";
import { IUnifiedWalletProvider } from "../utils/interfaces";
import { useWrappedReownAdapter } from "@jup-ag/jup-mobile-adapter";

export const useAllWallets = (
  metadata: IUnifiedWalletProvider["metadata"],
  walletConnectProjectId: string
) => {
  const { reownAdapter, jupiterAdapter } = useWrappedReownAdapter({
    appKitOptions: {
      metadata: {
        name: metadata?.name || "",
        description: metadata?.description || "",
        url: metadata?.url || "",
        icons: metadata?.iconUrls || [],
      },
      projectId: walletConnectProjectId,
      features: {
        analytics: false,
        socials: ["google", "x", "apple"],
        email: false,
      },
      enableWallets: false,
    },
  });

  return useMemo(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const {
      UnsafeBurnerWalletAdapter: _,
      WalletConnectWalletAdapter,
      ...allwalletAdapters
    } = AllWalletAdapters;

    const walletAdapters = Object.keys(allwalletAdapters)
      .filter((key) => key.includes("Adapter"))
      .map((key) => (allwalletAdapters as any)[key])
      .map((WalletAdapter: any) => new WalletAdapter());

    const walletConnectWalletAdapter: WalletAdapterWithMutableSupportedTransactionVersions<BaseSignerWalletAdapter> | null =
      (() => {
        const adapter: WalletAdapterWithMutableSupportedTransactionVersions<BaseSignerWalletAdapter> =
          new WalletConnectWalletAdapter({
            network: WalletAdapterNetwork.Mainnet,
            options: {
              relayUrl: "wss://relay.walletconnect.com",
              projectId: walletConnectProjectId,
              metadata: {
                name: metadata?.name,
                description: metadata?.description,
                url: metadata?.url,
                icons: metadata?.iconUrls,
              },
            },
          });

        adapter.supportedTransactionVersions = new Set([
          "legacy",
        ]) as BaseWalletAdapter["supportedTransactionVersions"];
        return adapter;
      })();

    return [
      ...walletAdapters,
      walletConnectWalletAdapter,
      reownAdapter,
      jupiterAdapter,
    ].filter((item) => item && item.name && item.icon);
  }, [metadata, walletConnectProjectId, reownAdapter, jupiterAdapter]);
};
