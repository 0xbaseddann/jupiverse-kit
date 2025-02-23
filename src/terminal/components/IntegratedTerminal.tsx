import React, { Suspense } from "react";
import { useJupiterTerminal } from "../hooks/useJupiterTerminal";
import { TerminalProps } from "../utils/interfaces";
import { getTerminalPlaceholder } from "../helpers/getTerminalPlaceholder";

interface IntegratedTerminalProps {
  rpcUrl?: string;
  refetchIntervalForTokenAccounts?: number;
  formProps?: TerminalProps['formProps'];
  simulateWalletpassthrough?: boolean;
  strictTokenList?: boolean;
  defaultExplorer?: TerminalProps['defaultExplorer'];
  containerClassName?: string;
  containerStyles?: React.CSSProperties;
  onSuccess?: TerminalProps['onSuccess'];
  onSwapError?: TerminalProps['onSwapError'];
}

export const IntegratedTerminal: React.FC<IntegratedTerminalProps> = ({
  rpcUrl = "https://api.mainnet-beta.solana.com",
  formProps,
  containerClassName,
  containerStyles,
  onSuccess,
  onSwapError,
  strictTokenList = true,
  defaultExplorer,
  simulateWalletpassthrough,
  refetchIntervalForTokenAccounts,
}) => {
  const { isMounted } = useJupiterTerminal({
    displayMode: "integrated",
    integratedTargetId: "integrated-terminal",
    endpoint: rpcUrl,
    formProps,
    containerClassName,
    containerStyles,
    strictTokenList,
    defaultExplorer,
    enableWalletPassthrough: simulateWalletpassthrough,
    refetchIntervalForTokenAccounts,
    onSuccess,
    onSwapError,
  });

  const placeholder = getTerminalPlaceholder(
    "integrated",
    "integrated-terminal"
  );

  if (!isMounted) {
    return placeholder;
  }

  return <Suspense fallback={placeholder}>{placeholder}</Suspense>;
};
