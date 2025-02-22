import React, { Suspense } from "react";
import { useJupiterTerminal } from "../hooks/useJupiterTerminal";
import { TerminalProps } from "../utils/interfaces";

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
