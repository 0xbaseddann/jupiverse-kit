import React, { Suspense, useEffect } from "react";
import { useJupiterTerminal } from "../hooks/useJupiterTerminal";
import { TerminalProps } from "../utils/interfaces";
import { getTerminalPlaceholder } from "../helpers/getTerminalPlaceholder";

interface ModalTerminalProps {
  rpcUrl?: string;
  refetchIntervalForTokenAccounts?: number;
  formProps?: TerminalProps["formProps"];
  simulateWalletpassthrough?: boolean;
  strictTokenList?: boolean;
  defaultExplorer?: TerminalProps["defaultExplorer"];
  onSuccess?: TerminalProps["onSuccess"];
  onSwapError?: TerminalProps["onSwapError"];
}

export const ModalTerminal: React.FC<ModalTerminalProps> = ({
  rpcUrl = "https://api.mainnet-beta.solana.com",
  formProps,
  simulateWalletpassthrough,
  strictTokenList = true,
  defaultExplorer,
  refetchIntervalForTokenAccounts,
  onSuccess,
  onSwapError,
}) => {
  const { isMounted } = useJupiterTerminal({
    displayMode: "modal",
    endpoint: rpcUrl,
    formProps,
    strictTokenList,
    defaultExplorer,
    enableWalletPassthrough: simulateWalletpassthrough,
    refetchIntervalForTokenAccounts,
    onSuccess,
    onSwapError,
  });

  const placeholder = getTerminalPlaceholder("modal");

  if (!isMounted) {
    return placeholder;
  }

  return <Suspense fallback={placeholder}>{placeholder}</Suspense>;
};
