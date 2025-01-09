import * as React from "react";
import { useCallback, useEffect } from "react";
import { useSwapStore } from "../store/useSwapStore";
import { useSwap } from "./useSwap";
import { useTokenBalance } from "./useTokenBalance";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import { toast } from "sonner";

export const useSwapOperations = (rpcUrl: string) => {
  const {
    tokenFrom,
    tokenTo,
    amountFrom,
    amountTo,
    slippage,
    setAmountFrom,
    setAmountTo,
    setQuoteResponse,
    setIsCalculating,
    setIsSwapping,
    setError,
  } = useSwapStore();

  const { getQuote, executeSwap, calculateMaxInput } = useSwap(rpcUrl);
  const { balance: fromBalance, refetch: refetchFromBalance } =
    useTokenBalance(tokenFrom);
  const { balance: toBalance, refetch: refetchToBalance } =
    useTokenBalance(tokenTo);

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
        toast.error("Invalid Input: Please enter a valid number", {
          description: "The amount must be a valid numerical value",
        });
        return;
      }

      const parsedAmount = parseFloat(amount);
      // Show error for zero or negative amount after debounce
      if (parsedAmount <= 0) {
        setAmountTo("0");
        setQuoteResponse(null);
        setIsCalculating(false);
        toast.error("Invalid Amount", {
          description: "Amount must be greater than 0",
        });
        return;
      }

      // Check balance only after we have a valid amount
      if (fromBalance !== null && parsedAmount > fromBalance) {
        setAmountTo("0");
        setQuoteResponse(null);
        toast.error("Insufficient Balance", {
          description: `You don't have enough ${tokenFrom.symbol} in your wallet`,
        });
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
            parseInt(quote.otherAmountThreshold) /
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
        toast.error("Quote Calculation Failed", {
          description: errorMessage,
        });
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
      toast.error("Invalid Swap", {
        description:
          "Please ensure you have selected tokens and entered valid amounts",
      });
      return;
    }

    setIsSwapping(true);
    const loadingToast = toast.loading("Processing Transaction", {
      description: "Please wait while your transaction is being processed",
    });

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
      toast.success("Swap Successful!", {
        description: (
          <div className="break-all flex flex-col bg-green-100">
            <span className="break-words">Transaction ID:</span>{" "}
            <a
              href={`https://solana.fm/tx/${txid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline break-words"
            >
              {txid}{" "}
              <SquareArrowOutUpRightIcon className="h-3 w-3 inline align-text-bottom" />
            </a>
          </div>
        ),
      });

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
        toast.error("Transaction Cancelled", {
          description: "You cancelled the transaction",
        });
      } else {
        toast.error("Transaction Failed", {
          description: errorMessage,
        });
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
    fromBalance,
    toBalance,
  };
};
