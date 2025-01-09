import { BaseWalletAdapter } from "@jup-ag/wallet-adapter";

export type WalletAdapterWithMutableSupportedTransactionVersions<T> = Omit<
  T,
  "supportedTransactionVersions"
> & {
  supportedTransactionVersions: BaseWalletAdapter["supportedTransactionVersions"];
};

export type IUnifiedTheme = "light" | "dark" | "jupiter";

export type IUnifiedEnv = "mainnet-beta" | "devnet" | "testnet";

export const DEFAULT_LANGUAGE = "en" as const;
export const OTHER_LANGUAGES = ["zh", "vi", "fr", "ja", "id", "ru"] as const;
export type AllLanguage =
  | typeof DEFAULT_LANGUAGE
  | (typeof OTHER_LANGUAGES)[number];
