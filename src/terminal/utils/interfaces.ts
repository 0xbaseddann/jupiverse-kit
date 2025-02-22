export interface TerminalProps {
  // terminal mode config
  displayMode?: "modal" | "integrated" | "widget";
  integratedTargetId?: string;

  // form configuration
  formProps?: {
    fixedInputMint?: boolean;
    fixedOutputMint?: boolean;
    swapMode?: "ExactIn" | "ExactOut";
    fixedAmount?: boolean;
    initialAmount?: string;
    initialSlippageBps?: number;
  };

  // styling
  containerClassName?: string;
  containerStyles?: React.CSSProperties;

  // endpoint config
  endpoint?: string;

  // callbacks
  onSuccess?: (params: { txid: string; swapResult: any }) => void;
  onSwapError?: (params: { error: Error }) => void;

  // additional params
  strictTokenList?: boolean;
  platformFeeAndAccounts?: any;
}
