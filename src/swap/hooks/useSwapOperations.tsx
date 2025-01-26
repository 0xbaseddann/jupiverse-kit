import React, { useCallback, useEffect, useRef } from "react";
import { useSwapStore, useSwapSelector } from "../store/useSwapStore";
import { useSwap } from "./useSwap";
import { useTokenBalance } from "./useTokenBalance";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import { toast } from "sonner";

interface SwapOperationsConfig {
  rpcUrl: string;
  referralKey?: string;
  platformFeeBps?: number;
  apiKey?: string;
}

export const useSwapOperations = (config: SwapOperationsConfig) => {
  // State selectors
  const tokenFrom = useSwapSelector((state) => state.tokenFrom);
  const tokenTo = useSwapSelector((state) => state.tokenTo);
  const amountFrom = useSwapSelector((state) => state.amountFrom);
  const amountTo = useSwapSelector((state) => state.amountTo);
  const slippage = useSwapSelector((state) => state.slippage);
  const isCalculating = useSwapSelector((state) => state.isCalculating);
  const isSwapping = useSwapSelector((state) => state.isSwapping);

  // Actions
  const {
    setAmountFrom,
    setAmountTo,
    setQuoteResponse,
    setIsCalculating,
    setIsSwapping,
    setError,
  } = useSwapStore();

  const { getQuote, executeSwap, calculateMaxInput } = useSwap(config);
  const { balance: fromBalance, refetch: refetchFromBalance } =
    useTokenBalance(tokenFrom);
  const { balance: toBalance, refetch: refetchToBalance } =
    useTokenBalance(tokenTo);

  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Memoized quote calculation with debounce
  const calculateQuote = useCallback(
    async (amount: string) => {
      // Skip quote calculation if tokens aren't selected
      if (!tokenFrom || !tokenTo) {
        setAmountTo("0");
        setQuoteResponse(null);
        setIsCalculating(false);
        return;
      }

      // Handle empty input silently
      if (!amount) {
        setAmountTo("0");
        setQuoteResponse(null);
        setIsCalculating(false);
        return;
      }

      // Show error for invalid number after debounce
      if (isNaN(parseFloat(amount))) {
        setAmountTo("0");
        setQuoteResponse(null);
        setIsCalculating(false);
        toast.error(
          <div className="flex flex-col bg-red-100 w-full p-4 rounded-lg">
            <span className="font-semibold">
              Invalid Input: Please enter a valid number
            </span>
            <span>The amount must be a valid numerical value</span>
          </div>,
          {
            style: {
              padding: 0,
              margin: 0,
            },
          }
        );
        return;
      }

      const parsedAmount = parseFloat(amount);
      // Show error for zero or negative amount after debounce
      if (parsedAmount <= 0) {
        setAmountTo("0");
        setQuoteResponse(null);
        setIsCalculating(false);
        toast.error(
          <div className="flex flex-col bg-red-100 w-full p-4 rounded-lg">
            <span className="font-semibold">Invalid Amount</span>
            <span>Amount must be greater than 0</span>
          </div>,
          {
            style: {
              padding: 0,
              margin: 0,
            },
          }
        );
        return;
      }

      // Check balance only after we have a valid amount
      if (fromBalance !== null && parsedAmount > fromBalance) {
        setAmountTo("0");
        setQuoteResponse(null);
        toast.error(
          <div className="flex flex-col bg-red-100 w-full p-4 rounded-lg">
            <span className="font-semibold">Insufficient Balance</span>
            <span>You don't have enough {tokenFrom.symbol} in your wallet</span>
          </div>,
          {
            style: {
              padding: 0,
              margin: 0,
            },
          }
        );
        return;
      }

      setIsCalculating(true);
      try {
        const quote = await getQuote(
          tokenFrom,
          tokenTo,
          parsedAmount,
          slippage * 100
        );

        if (quote) {
          setQuoteResponse(quote);
          const outputAmount = (
            parseInt(quote.outAmount) /
            Math.pow(10, tokenTo.decimals)
          ).toString();
          setAmountTo(outputAmount);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to calculate output amount";
        console.error("Failed to calculate output amount:", err);
        setAmountTo("0");
        setQuoteResponse(null);
        toast.error(
          <div className="flex flex-col bg-red-100 w-full p-4 rounded-lg">
            <span className="font-semibold">Quote Calculation Failed</span>
            <span className="break-words text-wrap">{errorMessage}</span>
          </div>,
          {
            style: {
              padding: 0,
              margin: 0,
            },
          }
        );
      } finally {
        setIsCalculating(false);
      }
    },
    [
      tokenFrom,
      tokenTo,
      slippage,
      fromBalance,
      getQuote,
      setAmountTo,
      setQuoteResponse,
      setIsCalculating,
    ]
  );

  // Add this new function to handle manual refresh
  const handleRefreshQuote = useCallback(() => {
    if (!amountFrom || !tokenFrom || !tokenTo) return;

    // Clear existing timer if any
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
    }

    // Trigger immediate quote calculation
    calculateQuote(amountFrom);

    // Start new refresh timer
    refreshTimerRef.current = setTimeout(() => {
      handleRefreshQuote();
    }, 15000);
  }, [amountFrom, tokenFrom, tokenTo, calculateQuote]);

  // Add auto-refresh effect
  useEffect(() => {
    if (amountFrom && tokenFrom && tokenTo && !isCalculating && !isSwapping) {
      refreshTimerRef.current = setTimeout(() => {
        handleRefreshQuote();
      }, 15000);
    }

    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, [
    amountFrom,
    tokenFrom,
    tokenTo,
    isCalculating,
    isSwapping,
    handleRefreshQuote,
  ]);

  // Debounced quote calculation
  const debouncedCalculateQuote = useCallback(
    (amount: string) => {
      const debounced = setTimeout(() => calculateQuote(amount), 500);
      return () => clearTimeout(debounced);
    },
    [calculateQuote]
  );

  // Effect to handle input validation and trigger quote calculation
  useEffect(() => {
    const validateAndCalculate = () => {
      // Reset 'to' amount for empty/invalid input without showing error
      if (!amountFrom || isNaN(parseFloat(amountFrom))) {
        setAmountTo("0");
        setQuoteResponse(null);
        return;
      }

      const parsedAmount = parseFloat(amountFrom);
      // Skip calculation for zero or negative amounts without showing error
      if (parsedAmount <= 0) {
        setAmountTo("0");
        setQuoteResponse(null);
        return;
      }

      // Proceed with quote calculation if input is valid and positive
      debouncedCalculateQuote(amountFrom);
    };

    validateAndCalculate();
  }, [amountFrom, debouncedCalculateQuote, setAmountTo, setQuoteResponse]);

  // Calculate maximum input amount
  const calculateMaximumInput = useCallback(async () => {
    if (!tokenFrom || !fromBalance || fromBalance <= 0) return;

    const maxAmount = await calculateMaxInput(tokenFrom, fromBalance);
    return maxAmount.toFixed(tokenFrom.decimals);
  }, [tokenFrom, fromBalance, calculateMaxInput]);

  // Handle swap execution
  const handleSwap = useCallback(async () => {
    if (!tokenFrom || !tokenTo || !amountFrom || !amountTo) {
      toast.error(
        <div className="flex flex-col bg-red-100 w-full p-4 rounded-lg">
          <span className="font-semibold">Invalid Swap</span>
          <span>
            Please ensure you have selected tokens and entered valid amounts
          </span>
        </div>,
        {
          style: {
            padding: 0,
            margin: 0,
          },
        }
      );
      return;
    }

    setIsSwapping(true);
    const loadingToast = toast.loading(
      <div className="flex flex-col p-4">
        <span className="font-semibold">Processing Transaction</span>
        <span className="text-xs text-black/50">
          Please wait while your transaction is being processed
        </span>
      </div>,
      {
        style: {
          padding: 0,
          margin: 0,
        },
      }
    );

    try {
      const quote = await getQuote(
        tokenFrom,
        tokenTo,
        parseFloat(amountFrom),
        slippage * 100
      );

      if (!quote) {
        throw new Error("Failed to get quote");
      }

      const txid = await executeSwap(quote);
      if (!txid) {
        throw new Error("Failed to execute swap");
      }

      // Reset amounts and states only on successful swap
      setAmountFrom("");
      setAmountTo("0");
      setQuoteResponse(null);
      setError(null);

      toast.dismiss(loadingToast);
      toast.success(
        <div className="flex flex-col bg-green-100 w-full p-4  rounded-lg">
          <span className="font-semibold">Swap Successful!</span>
          <span className="text-xs text-black/50">
            <span className="break-words">Transaction ID:</span>
            <a
              href={`https://solana.fm/tx/${txid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline break-words"
            >
              {txid}{" "}
              <SquareArrowOutUpRightIcon className="h-3 w-3 inline align-text-bottom" />
            </a>
          </span>
        </div>,
        {
          style: {
            padding: 0,
            margin: 0,
          },
        }
      );

      await Promise.all([refetchFromBalance(), refetchToBalance()]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to execute swap";

      toast.dismiss(loadingToast);

      // Check if user rejected/cancelled the transaction
      if (
        errorMessage.toLowerCase().includes("user rejected") ||
        errorMessage.toLowerCase().includes("cancelled")
      ) {
        toast.error(
          <div className="flex flex-col bg-red-100 w-full p-4 rounded-lg">
            <span className="font-semibold">Transaction Cancelled</span>
            <span>You cancelled the transaction</span>
          </div>,
          {
            style: {
              padding: 0,
              margin: 0,
            },
          }
        );
      } else {
        toast.error(
          <div className="flex flex-col bg-red-100 w-full p-4 rounded-lg">
            <span className="font-semibold">Transaction Failed</span>
            <span className="break-words text-wrap">{errorMessage}</span>
          </div>,
          {
            style: {
              padding: 0,
              margin: 0,
            },
          }
        );
      }

      console.error("Swap failed:", err);
      setError(errorMessage);

      // Refetch quote to ensure prices are up to date
      if (amountFrom && !isNaN(parseFloat(amountFrom))) {
        calculateQuote(amountFrom);
      }
    } finally {
      setIsSwapping(false);
    }
  }, [
    tokenFrom,
    tokenTo,
    amountFrom,
    amountTo,
    slippage,
    getQuote,
    executeSwap,
    setAmountFrom,
    setAmountTo,
    setQuoteResponse,
    setIsCalculating,
    setIsSwapping,
    setError,
    refetchFromBalance,
    refetchToBalance,
  ]);

  return {
    calculateMaximumInput,
    handleSwap,
    handleRefreshQuote,
    fromBalance,
    toBalance,
  };
};
