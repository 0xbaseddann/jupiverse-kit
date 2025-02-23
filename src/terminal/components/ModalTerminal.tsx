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
  buttonClassName = "p-4 hover:bg-white/10 rounded-xl cursor-pointer flex flex-col items-center justify-center text-white",
}) => {
  useJupiterTerminal({
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

  return (
    <button
      type="button"
      onClick={() => {
        if (window.Jupiter) {
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
