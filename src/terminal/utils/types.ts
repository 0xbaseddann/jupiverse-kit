import { UltraQuoteResponse } from "../components/ultra/data/UltraSwapService";
import { FormattedUltraQuoteResponse } from "../components/ultra/entity/FormattedUltraQuoteResponse";

export type DisplayMode = "integrated" | "widget" | "modal";

export type WidgetPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";
export type WidgetSize = "sm" | "default";

export type DefaultExplorer =
  | "Solana Explorer"
  | "Solscan"
  | "Solana Beach"
  | "SolanaFM";

export type QuoteResponse = {
  original: UltraQuoteResponse;
  quoteResponse: FormattedUltraQuoteResponse;
};
