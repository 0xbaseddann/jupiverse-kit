export interface JupiterTerminalOptions {
  displayMode?: "modal" | "integrated" | "widget";
  integratedTargetId?: string;
  endpoint?: string;
  formProps?: {
    fixedInputMint?: boolean;
    fixedOutputMint?: boolean;
    swapMode?: "ExactIn" | "ExactOut";
    fixedAmount?: boolean;
    initialAmount?: string;
    initialSlippageBps?: number;
  };
  containerClassName?: string;
  containerStyles?: React.CSSProperties;
  strictTokenList?: boolean;
  platformFeeAndAccounts?: any;
  onSuccess?: (params: { txid: string; swapResult: any }) => void;
  onSwapError?: (params: { error: Error }) => void;
}

export interface JupiterTerminal {
  init: (options: JupiterTerminalOptions) => void;
  resume: () => void;
  close: () => void;
  _instance?: any;
}

declare global {
  interface Window {
    Jupiter: JupiterTerminal;
  }
}

export {};
