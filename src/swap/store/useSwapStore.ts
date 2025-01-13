import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SwapState, SwapActions } from "../utils/interfaces";

// Define the initial state of the swap store
const initialState: SwapState = {
  tokenFrom: null,
  tokenTo: null,
  amountFrom: "",
  amountTo: "",
  slippage: 3,
  quoteResponse: null,
  isCalculating: false,
  isSwapping: false,
  isFromDialogOpen: false,
  isToDialogOpen: false,
  error: null,
};

export const useSwapStore = create<SwapState & SwapActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setTokenFrom: (token) => set({ tokenFrom: token }),
      setTokenTo: (token) => set({ tokenTo: token }),
      setAmountFrom: (amount) => {
        // Always set the input amount
        set({ amountFrom: amount });

        // Reset 'to' amount if 'from' amount is invalid
        if (!amount || isNaN(parseFloat(amount))) {
          set({ amountTo: "0", quoteResponse: null });
        }
      },
      setAmountTo: (amount) => set({ amountTo: amount }),
      setSlippage: (slippage) => set({ slippage }),
      setQuoteResponse: (quote) => set({ quoteResponse: quote }),
      setIsCalculating: (isCalculating) => set({ isCalculating }),
      setIsSwapping: (isSwapping) => set({ isSwapping }),
      setIsFromDialogOpen: (isOpen) => set({ isFromDialogOpen: isOpen }),
      setIsToDialogOpen: (isOpen) => set({ isToDialogOpen: isOpen }),
      setError: (error) => {
        set({ error });
        // Reset 'to' amount when there's an error to trigger recalculation
        if (error) {
          set({ amountTo: "", quoteResponse: null });
        }
      },

      reset: () => {
        const { tokenFrom, tokenTo } = get();
        set({
          ...initialState,
          // Preserve selected tokens
          tokenFrom,
          tokenTo,
        });
      },

      resetAmounts: () =>
        set({
          amountFrom: "",
          amountTo: "",
          quoteResponse: null,
          error: null,
        }),

      swapTokens: () => {
        const { tokenFrom, tokenTo, amountFrom, amountTo } = get();
        set({
          tokenFrom: tokenTo,
          tokenTo: tokenFrom,
          amountFrom: amountTo,
          amountTo: amountFrom,
        });
      },
    }),
    {
      name: "swap-storage",
      // Only persist tokens, amounts, and slippage
      partialize: (state) => ({
        tokenFrom: state.tokenFrom,
        tokenTo: state.tokenTo,
        amountFrom: state.amountFrom,
        amountTo: state.amountTo,
        slippage: state.slippage,
      }),
    }
  )
);

// Selector hook for better performance
export const useSwapSelector = <T>(selector: (state: SwapState) => T) =>
  useSwapStore(selector);
