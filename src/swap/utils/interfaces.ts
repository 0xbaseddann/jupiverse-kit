export interface QuoteResponse {
  inputMint: string;
  outputMint: string;
  amount: string;
  swapMode: "ExactIn" | "ExactOut";
  slippageBps: number;
  otherAmountThreshold: string;
  routes: any[];
  contextSlot: number;
}

export interface SwapResponse {
  swapTransaction: string;
}
