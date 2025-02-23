import React, { Suspense } from "react";
import { useJupiterTerminal } from "../hooks/useJupiterTerminal";
import { TerminalProps } from "../utils/interfaces";
import { getTerminalPlaceholder } from "../helpers/getTerminalPlaceholder";
import { WidgetPosition, WidgetSize } from "../utils/types";

interface WidgetTerminalProps {
  rpcUrl?: string;
  refetchIntervalForTokenAccounts?: number;
  formProps?: TerminalProps['formProps'];
  simulateWalletpassthrough?: boolean;
  strictTokenList?: boolean;
  defaultExplorer?: TerminalProps['defaultExplorer'];
  widgetPosition?: WidgetPosition;
  widgetSize?: WidgetSize;
  onSuccess?: TerminalProps['onSuccess'];
  onSwapError?: TerminalProps['onSwapError'];
}

export const WidgetTerminal: React.FC<WidgetTerminalProps> = ({
  rpcUrl = "https://api.mainnet-beta.solana.com",
  formProps,
  simulateWalletpassthrough,
  strictTokenList = true,
  defaultExplorer,
  refetchIntervalForTokenAccounts,
  widgetPosition = "bottom-right",
  widgetSize = "default",
  onSuccess,
  onSwapError,
}) => {
  const { isMounted } = useJupiterTerminal({
    displayMode: "widget",
    endpoint: rpcUrl,
    formProps,
    strictTokenList,
    defaultExplorer,
    enableWalletPassthrough: simulateWalletpassthrough,
    refetchIntervalForTokenAccounts,
    widgetStyle: {
      position: widgetPosition,
      size: widgetSize,
    },
    onSuccess,
    onSwapError,
  });

  const placeholder = getTerminalPlaceholder(
    "widget",
  );

  if (!isMounted) {
    return placeholder;
  }

  return <Suspense fallback={placeholder}>{placeholder}</Suspense>;
};
