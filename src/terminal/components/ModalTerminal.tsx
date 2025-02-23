import React from "react";
import { useJupiterTerminal } from "../hooks/useJupiterTerminal";
import { TerminalProps } from "../utils/interfaces";

interface ModalTerminalProps {
  rpcUrl?: string;
  refetchIntervalForTokenAccounts?: number;
  formProps?: TerminalProps["formProps"];
  simulateWalletpassthrough?: boolean;
  strictTokenList?: boolean;
  defaultExplorer?: TerminalProps["defaultExplorer"];
  onSuccess?: TerminalProps["onSuccess"];
  onSwapError?: TerminalProps["onSwapError"];
  buttonText?: string;
  buttonClassName?: string;
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
  buttonText = "Launch Modal Terminal",
  buttonClassName = "p-4 rounded-xl cursor-pointer flex flex-col items-center justify-center transition-colors duration-300 bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-black dark:hover:bg-gray-300 font-sans font-semibold",
}) => {
  const { scriptLoaded } = useJupiterTerminal({
    displayMode: "modal",
    endpoint: rpcUrl,
    formProps,
    strictTokenList,
    defaultExplorer,
    enableWalletPassthrough: simulateWalletpassthrough,
    refetchIntervalForTokenAccounts,
    onSuccess,
    onSwapError,
    skipInit: true,
  });

  return (
    <button
      type="button"
      onClick={() => {
        if (scriptLoaded && window.Jupiter) {
          window.Jupiter.init({
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
        }
      }}
      className={buttonClassName}
    >
      <span className="text-xs">{buttonText}</span>
    </button>
  );
};
