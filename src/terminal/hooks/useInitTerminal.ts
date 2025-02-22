import { useCallback } from "react";
import { TerminalProps } from "../utils/interfaces";

export const useInitTerminal = ({
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
}: TerminalProps) => {
  return useCallback(() => {
    if (typeof window !== "undefined" && window.Jupiter) {
      window.Jupiter.init({
        displayMode,
        integratedTargetId,
        endpoint,
        formProps,
        containerClassName,
        containerStyles,
        strictTokenList,
        platformFeeAndAccounts,
        onSuccess: (params) => onSuccess?.(params),
        onSwapError: (params) => onSwapError?.(params),
      });
    }
  }, [
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
  ]);
};
