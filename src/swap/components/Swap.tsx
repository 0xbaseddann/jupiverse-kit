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
  const { connected, publicKey } = useWallet();
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
        description: swapError,
        variant: "destructive",
        duration: 8000,
      });
    }
  }, [swapError, toast]);

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
      description: "Please approve the transaction in your wallet",
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
              Transaction ID:{" "}
              <a
                href={`https://solana.fm/tx/${txid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
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
        description:
          err instanceof Error
            ? err.message
            : "An error occurred during the swap",
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
    <div className="w-full max-w-[480px] p-4">
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Swap</h2>
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
          <div className="rounded-2xl bg-muted p-4 mb-1">
            <div className="flex justify-between mb-2">
              <input
                type="number"
                placeholder="0"
                value={amountFrom}
                onChange={(e) => setAmountFrom(e.target.value)}
                className="w-full border-0 bg-transparent text-2xl p-0 h-auto focus-visible:outline-none focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                disabled={isSwapping}
              />
              <SwapTokenButton
                token={tokenFrom}
                onClick={() => setIsFromDialogOpen(true)}
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {tokenFrom &&
                  `Balance: ${formatBalance(fromBalance)} ${tokenFrom.symbol}`}
              </div>
              <div className="flex gap-1">
                <button
                  className="h-6 px-2 text-xs rounded-md transition-colors hover:bg-accent bg-transparent"
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
                  className="h-6 px-2 text-xs rounded-md transition-colors hover:bg-accent bg-transparent"
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
                  className="h-6 px-2 text-xs rounded-md transition-colors hover:bg-accent bg-transparent"
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
          <div className="flex justify-center -my-2.5 relative z-0 mt-1 mb-1">
            <button
              className="h-10 w-10 rounded-xl bg-muted hover:bg-accent transition-colors flex items-center justify-center disabled:opacity-50"
              onClick={handleSwapTokens}
              disabled={isSwapping}
              aria-label="Swap token positions"
            >
              <ArrowDown className="h-4 w-4" />
            </button>
          </div>

          {/* To Token Input */}
          <div className="rounded-2xl bg-muted p-4 mt-1">
            <div className="flex justify-between mb-2">
              <input
                type="number"
                placeholder="0"
                value={amountTo}
                onChange={(e) => setAmountTo(e.target.value)}
                className="w-full border-0 bg-transparent text-2xl p-0 h-auto focus-visible:outline-none focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                disabled={true}
              />
              <SwapTokenButton
                token={tokenTo}
                onClick={() => setIsToDialogOpen(true)}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {tokenTo &&
                `Balance: ${formatBalance(toBalance)} ${tokenTo.symbol}`}
            </div>
          </div>

          {/* Swap Button or Connect Wallet Button */}
          {connected ? (
            <button
              className="w-full mt-4 py-6 text-base font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              onClick={handleSwap}
              disabled={isSwapDisabled}
            >
              {isCalculating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : isSwapping ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Swapping...
                </>
              ) : (
                "Swap"
              )}
            </button>
          ) : (
            <WalletConnectButton className="w-full mt-4 py-6 text-base font-semibold text-center items-center flex justify-center" />
          )}

          {/* Powered by Jupiter logo */}
          <div className="flex justify-center mt-4">
            <JupiterBrightLogo
              width={150}
              height={25}
              className="block dark:hidden"
              preserveAspectRatio="xMidYMid meet"
            />
            <JupiterDarkLogo
              width={150}
              height={25}
              className="hidden dark:block"
              preserveAspectRatio="xMidYMid meet"
            />
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
