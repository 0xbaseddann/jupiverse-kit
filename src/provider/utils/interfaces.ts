import { SupportedTransactionVersions } from "@jup-ag/wallet-adapter";
import { IUnifiedTheme, IUnifiedEnv, AllLanguage } from "./types";

export interface IUnifiedWalletProvider {
  children: React.ReactNode;
  autoConnect?: boolean;
  env?: IUnifiedEnv;
  endpoint?: string;
  walletConnectProjectId?: string;
  metadata?: IUnifiedWalletProviderMetadata;
  onConnect?: () => void;
  onConnecting?: () => void;
  onDisconnect?: () => void;
  onNotInstalled?: () => void;
  theme?: IUnifiedTheme;
  lang?: AllLanguage;
  wallets?: any[];
}

export interface IUnifiedWalletProviderMetadata {
  name: string;
  description: string;
  url: string;
  iconUrls: string[];
}

export interface IWalletNotification {
  publicKey: string;
  shortAddress: string;
  walletName: string;
  metadata: {
    name: string;
    url: string;
    icon: string;
    supportedTransactionVersions?: SupportedTransactionVersions;
  };
}
