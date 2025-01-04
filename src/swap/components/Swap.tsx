import React, { useEffect, useCallback, useState } from "react";

import { ReactComponent as JupiterBrightLogo } from "../../assets/jupiter/poweredbyjupiter-bright.svg";
import { ReactComponent as JupiterDarkLogo } from "../../assets/jupiter/poweredbyjupiter-dark.svg";

import { ArrowDown, Loader2, SquareArrowOutUpRightIcon } from "lucide-react";

import { useWallet } from "@solana/wallet-adapter-react";

import SwapSettings from "./SwapSettings";
import SwapTokenButton from "./SwapTokenButton";
import SwapTokenDialog from "./SwapTokenDialog";

import { WalletConnectButton } from "../../wallet/components/WalletConnectButton";

import { Token, useTokens } from "../hooks/useTokens";
import { useTokenBalance } from "../hooks/useTokenBalance";
import { useSwap } from "../hooks/useSwap";

import { useToast } from "../../toast/hooks/useToast";

import { QuoteResponse } from "../utils/interfaces";

interface SwapProps {
  rpcUrl: string;
}

const Swap = ({ rpcUrl }: SwapProps) => {
  const { tokens } = useTokens();
  const [tokenFrom, setTokenFrom] = useState<Token | null>(null);
  const [tokenTo, setTokenTo] = useState<Token | null>(null);
  const [amountFrom, setAmountFrom] = useState("");
  const [amountTo, setAmountTo] = useState("");
  const [isFromDialogOpen, setIsFromDialogOpen] = useState(false);
  const [isToDialogOpen, setIsToDialogOpen] = useState(false);
  const { connected } = useWallet();
  const {
    getQuote,
    executeSwap,
    calculateMaxInput,
    error: swapError,
  } = useSwap(rpcUrl);
  const [slippage, setSlippage] = useState(3);
  const [quoteResponse, setQuoteResponse] = useState<QuoteResponse | null>(
    null
  );
  const { balance: fromBalance, refetch: refetchFromBalance } =
    useTokenBalance(tokenFrom);
  const { balance: toBalance, refetch: refetchToBalance } =
    useTokenBalance(tokenTo);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (swapError) {
      toast({
        title: "Swap Error",
        description: (
          <div className="break-words max-w-[280px] sm:max-w-[340px] whitespace-pre-wrap">
            {swapError}
          </div>
        ),
        variant: "destructive",
        duration: 8000,
      });

      // Refetch balances and recalculate swap when there's an error
      const handleError = async () => {
        await refetchFromBalance();
        await refetchToBalance();
        if (amountFrom) {
          debouncedCalculateOutput(amountFrom);
        }
      };
      handleError();
    }
  }, [swapError, toast, refetchFromBalance, refetchToBalance, amountFrom]);

  const formatBalance = (balance: number | null) => {
    if (balance === null) return "0";
    return balance.toFixed(5);
  };

  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), wait);
    };
  };

  useEffect(() => {
    if (tokens.length > 0 && !tokenFrom && !tokenTo) {
      const solToken = tokens.find((token) => token.symbol === "SOL");
      const usdcToken = tokens.find((token) => token.symbol === "USDC");

      if (solToken) setTokenFrom(solToken);
      if (usdcToken) setTokenTo(usdcToken);
    }
  }, [tokens, tokenFrom, tokenTo]);

  const debouncedCalculateOutput = useCallback(
    debounce(async (amount: string) => {
      if (!tokenFrom || !tokenTo || !amount || isNaN(parseFloat(amount))) {
        setAmountTo("");
        setQuoteResponse(null);
        setIsCalculating(false);
        return;
      }

      setIsCalculating(true);
      try {
        const quote = await getQuote(
          tokenFrom,
          tokenTo,
          parseFloat(amount),
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
        console.error("Failed to calculate output amount:", err);
        setAmountTo("");
        setQuoteResponse(null);
      } finally {
        setIsCalculating(false);
      }
    }, 500),
    [tokenFrom, tokenTo, slippage, getQuote]
  );

  useEffect(() => {
    debouncedCalculateOutput(amountFrom);
  }, [amountFrom, debouncedCalculateOutput]);

  const handleSwapTokens = () => {
    const tempToken = tokenFrom;
    const tempAmount = amountFrom;
    setTokenFrom(tokenTo);
    setTokenTo(tempToken);
    setAmountFrom(amountTo);
    setAmountTo(tempAmount);
  };

  const handleSwap = async () => {
    if (!quoteResponse || !connected) return;

    setIsSwapping(true);
    toast({
      title: "Preparing swap transaction...",
      description: (
        <div className="break-words">
          Please approve the transaction in your wallet
        </div>
      ),
      duration: 8000,
    });

    try {
      const txid = await executeSwap(quoteResponse);
      console.log("txid", txid);
      if (txid) {
        setAmountFrom("");
        setAmountTo("");
        setQuoteResponse(null);
        console.log(`Swap successful! Transaction ID: ${txid}`);
        toast({
          title: "Swap successful!",
          description: (
            <div className="break-all flex flex-col">
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
          duration: 8000,
        });

        await Promise.all([refetchFromBalance(), refetchToBalance()]);
      }
    } catch (err) {
      toast({
        title: "Swap failed",
        description: (
          <div className="break-words">
            {err instanceof Error
              ? err.message
              : "An error occurred during the swap"}
          </div>
        ),
        variant: "destructive",
        duration: 8000,
      });
      console.error("Swap failed:", err);
    } finally {
      setIsSwapping(false);
    }
  };

  const isSwapDisabled =
    !connected ||
    !tokenFrom ||
    !tokenTo ||
    !amountFrom ||
    !amountTo ||
    isCalculating ||
    isSwapping;

  return (
    <div className="w-full max-w-[480px] p-4 font-sans">
      <div className="rounded-3xl shadow-xl bg-background dark:bg-background-dark">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Swap</h2>
            <SwapSettings
              slippage={slippage}
              onSlippageChange={(value: number) => {
                setSlippage(value);
                if (amountFrom) {
                  debouncedCalculateOutput(amountFrom);
                }
              }}
              onSave={() => {
                if (amountFrom) {
                  debouncedCalculateOutput(amountFrom);
                }
              }}
            />
          </div>

          {/* From Token Input */}
          <div className="themed-card rounded-2xl p-4 mb-2 ">
            <div className="flex justify-between mb-3">
              <input
                type="number"
                placeholder="0"
                value={amountFrom}
                onChange={(e) => setAmountFrom(e.target.value)}
                className="w-full bg-transparent text-xl font-medium p-0 h-auto focus-visible:outline-none focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                disabled={isSwapping}
              />
              <SwapTokenButton
                token={tokenFrom}
                onClick={() => setIsFromDialogOpen(true)}
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground dark:text-muted-dark-foreground">
                {tokenFrom &&
                  `Balance: ${formatBalance(fromBalance)} ${tokenFrom.symbol}`}
              </div>
              <div className="flex gap-1.5">
                <button
                  className="h-7 px-2.5 text-xs font-medium rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground"
                  onClick={() => {
                    if (fromBalance && tokenFrom) {
                      const amount = (fromBalance * 0.25).toFixed(
                        tokenFrom.decimals
                      );
                      setAmountFrom(amount);
                    }
                  }}
                  disabled={!fromBalance || fromBalance <= 0}
                >
                  25%
                </button>
                <button
                  className="h-7 px-2.5 text-xs font-medium rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground"
                  onClick={() => {
                    if (fromBalance && tokenFrom) {
                      const amount = (fromBalance * 0.5).toFixed(
                        tokenFrom.decimals
                      );
                      setAmountFrom(amount);
                    }
                  }}
                  disabled={!fromBalance || fromBalance <= 0}
                >
                  50%
                </button>
                <button
                  className="h-7 px-2.5 text-xs font-medium rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground"
                  onClick={async () => {
                    if (fromBalance && tokenFrom) {
                      const maxAmount = await calculateMaxInput(
                        tokenFrom,
                        fromBalance
                      );
                      setAmountFrom(maxAmount.toFixed(tokenFrom.decimals));
                    }
                  }}
                  disabled={!fromBalance || fromBalance <= 0}
                >
                  MAX
                </button>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-3 relative z-10 mt-3 mb-3">
            <button
              className="h-9 w-9 rounded-xl bg-card dark:bg-card-dark hover:bg-accent dark:hover:bg-accent transition-colors flex items-center justify-center shadow-md disabled:opacity-50"
              onClick={handleSwapTokens}
              disabled={isSwapping}
              aria-label="Swap token positions"
            >
              <ArrowDown className="h-4 w-4" />
            </button>
          </div>

          {/* To Token Input */}
          <div className="themed-card rounded-2xl p-4 mt-2 bg-muted/20 dark:bg-muted-dark/20">
            <div className="flex justify-between mb-3">
              <input
                type="number"
                placeholder="0"
                value={amountTo}
                onChange={(e) => setAmountTo(e.target.value)}
                className="w-full bg-transparent text-xl font-medium p-0 h-auto focus-visible:outline-none focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                disabled={true}
              />
              <SwapTokenButton
                token={tokenTo}
                onClick={() => setIsToDialogOpen(true)}
              />
            </div>
            <div className="text-sm text-muted-foreground dark:text-muted-dark-foreground">
              {tokenTo &&
                `Balance: ${formatBalance(toBalance)} ${tokenTo.symbol}`}
            </div>
          </div>

          {/* Swap Button or Connect Wallet Button */}
          {connected ? (
            <button
              className="w-full h-10 mt-6 py-4 text-base font-semibold rounded-2xl themed-button-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              onClick={handleSwap}
              disabled={isSwapDisabled}
            >
              {isCalculating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : isSwapping ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Swapping...
                </>
              ) : (
                "Swap"
              )}
            </button>
          ) : (
            <WalletConnectButton className="w-full mt-6 py-4 text-base font-semibold rounded-2xl text-center items-center flex justify-center" />
          )}

          {/* Powered by Jupiter logo */}
          <div className="flex justify-center mt-6">
            <a href="https://jup.ag" target="_blank" rel="noopener noreferrer">
              <JupiterBrightLogo
                width={150}
                height={25}
                className="block dark:hidden opacity-75 hover:opacity-100 transition-opacity"
                preserveAspectRatio="xMidYMid meet"
              />
              <JupiterDarkLogo
                width={150}
                height={25}
                className="hidden dark:block opacity-75 hover:opacity-100 transition-opacity"
                preserveAspectRatio="xMidYMid meet"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Token Selection Dialogs */}
      <SwapTokenDialog
        open={isFromDialogOpen}
        onClose={() => setIsFromDialogOpen(false)}
        onSelect={setTokenFrom}
      />
      <SwapTokenDialog
        open={isToDialogOpen}
        onClose={() => setIsToDialogOpen(false)}
        onSelect={setTokenTo}
      />
    </div>
  );
};

export default Swap;
