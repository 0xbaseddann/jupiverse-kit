import React, { Suspense } from "react";
import { useJupiterTerminal } from "../hooks/useJupiterTerminal";

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

const TerminalPlaceholder = (
  displayMode: string,
  integratedTargetId?: string
) => {
  const placeholder = <div id={integratedTargetId || "integrated-terminal"} />;
  return displayMode === "integrated" ? placeholder : null;
};

export const Terminal: React.FC<TerminalProps> = ({
  displayMode = "integrated",
  integratedTargetId,
  formProps,
  containerClassName,
  containerStyles,
  endpoint = "https://api.mainnet-beta.solana.com",
  onSuccess,
  onSwapError,
  strictTokenList = true,
  platformFeeAndAccounts,
}) => {
  const { isMounted } = useJupiterTerminal({
    displayMode,
    integratedTargetId,
    endpoint,
    formProps,
    containerClassName,
    containerStyles,
    strictTokenList,
    platformFeeAndAccounts,
    onSuccess,
    onSwapError,
  });

  const placeholder = TerminalPlaceholder(displayMode, integratedTargetId);

  if (!isMounted) {
    return placeholder;
  }

  return <Suspense fallback={placeholder}>{placeholder}</Suspense>;
};
