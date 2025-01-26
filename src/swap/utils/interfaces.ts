export interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  tags: string[];
  daily_volume: number;
  freeze_authority: string | null;
  mint_authority: string | null;
}

export interface QuoteResponse {
  inputMint: string;
  outputMint: string;
  amount: string;
  swapMode: "ExactIn" | "ExactOut";
  outAmount: string;
  slippageBps: number;
  otherAmountThreshold: string;
  routes: any[];
  contextSlot: number;
}

export interface SwapResponse {
  swapTransaction: string;
}

export interface SwapState {
  tokenFrom: Token | null;
  tokenTo: Token | null;
  amountFrom: string;
  amountTo: string;
  slippage: number;
  quoteResponse: QuoteResponse | null;
  isCalculating: boolean;
  isSwapping: boolean;
  isFromDialogOpen: boolean;
  isToDialogOpen: boolean;
  error: string | null;
}

export interface SwapActions {
  setTokenFrom: (token: Token | null) => void;
  setTokenTo: (token: Token | null) => void;
  setAmountFrom: (amount: string) => void;
  setAmountTo: (amount: string) => void;
  setSlippage: (slippage: number) => void;
  setQuoteResponse: (quote: QuoteResponse | null) => void;
  setIsCalculating: (isCalculating: boolean) => void;
  setIsSwapping: (isSwapping: boolean) => void;
  setIsFromDialogOpen: (isOpen: boolean) => void;
  setIsToDialogOpen: (isOpen: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
  swapTokens: () => void;
  resetAmounts: () => void;
}
