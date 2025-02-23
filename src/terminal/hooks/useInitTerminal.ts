import { useCallback, useRef } from "react";
import { TerminalProps } from "../utils/interfaces";
import { TransactionError } from "@solana/web3.js";

export const useInitTerminal = ({
  displayMode,
  integratedTargetId,
  endpoint,
  formProps,
  containerClassName,
  containerStyles,
  strictTokenList,
  defaultExplorer,
  enableWalletPassthrough,
  refetchIntervalForTokenAccounts,
  widgetStyle,
  onSuccess,
  onSwapError,
}: TerminalProps) => {
  const initTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const isInitializedRef = useRef(false);

  return useCallback(() => {
    if (typeof window === "undefined" || !window.Jupiter || isInitializedRef.current) {
      return;
    }

    // Clear any pending initialization
    if (initTimeoutRef.current) {
      clearTimeout(initTimeoutRef.current);
    }

    // Debounce initialization to prevent rapid re-inits
    initTimeoutRef.current = setTimeout(() => {
      if (!isInitializedRef.current) {
        isInitializedRef.current = true;
        window.Jupiter.init({
          displayMode,
          integratedTargetId,
          endpoint,
          formProps,
          containerClassName,
          containerStyles,
          strictTokenList,
          defaultExplorer,
          enableWalletPassthrough,
          refetchIntervalForTokenAccounts,
          widgetStyle, // Pass through widgetStyle configuration
          onSuccess: ({ txid, swapResult }) => {
            if (onSuccess) {
              onSuccess({ 
                txid, 
                swapResult, 
                quoteResponseMeta: null 
              });
            }
          },
          onSwapError: ({ error }) => {
            if (onSwapError) {
              onSwapError({ 
                error: error as TransactionError | undefined,
                quoteResponseMeta: null 
              });
            }
          },
        });
      }
    }, 1000);

    return () => {
      if (initTimeoutRef.current) {
        clearTimeout(initTimeoutRef.current);
      }
    };
  }, [
    displayMode,
    integratedTargetId,
    endpoint,
    formProps,
    containerClassName,
    containerStyles,
    strictTokenList,
    defaultExplorer,
    enableWalletPassthrough,
    refetchIntervalForTokenAccounts,
    widgetStyle,
    onSuccess,
    onSwapError,
  ]);
};
