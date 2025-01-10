import React, { useEffect } from "react";
import { ReactComponent as JupiterBrightLogo } from "../../assets/powered-by-jupiter/poweredbyjupiter-bright.svg";
import { ReactComponent as JupiterDarkLogo } from "../../assets/powered-by-jupiter/poweredbyjupiter-dark.svg";
import { ArrowDown, Loader2 } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import SwapSettings from "./SwapSettings";
import SwapTokenButton from "./SwapTokenButton";
import SwapTokenDialog from "./SwapTokenDialog";
import { WalletIcon } from "lucide-react";
import { useTokens } from "../hooks/useTokens";
import { useSwapStore } from "../store/useSwapStore";
import { useSwapOperations } from "../hooks/useSwapOperations";
import { formatBalance } from "../helpers/formatBalance";
import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";

interface SwapProps {
  rpcUrl: string;
}

const Swap = ({ rpcUrl }: SwapProps) => {
  const { tokens } = useTokens();
  const { connected } = useWallet();
  const {
    tokenFrom,
    tokenTo,
    amountFrom,
    amountTo,
    slippage,
    isFromDialogOpen,
    isToDialogOpen,
    isCalculating,
    isSwapping,
    setTokenFrom,
    setTokenTo,
    setAmountFrom,
    setSlippage,
    setIsFromDialogOpen,
    setIsToDialogOpen,
    swapTokens,
  } = useSwapStore();

  const { calculateMaximumInput, handleSwap, fromBalance, toBalance } =
    useSwapOperations(rpcUrl);

  // Initialize default tokens only if no tokens are selected or persisted
  useEffect(() => {
    // Skip if tokens haven't loaded yet
    if (tokens.length === 0) return;

    // Skip if we already have tokens selected
    if (tokenFrom || tokenTo) return;

    // Check if we have persisted tokens in localStorage
    const persistedState = localStorage.getItem("swap-storage");
    if (persistedState) {
      const { state } = JSON.parse(persistedState);
      // Skip if we have persisted tokens
      if (state.tokenFrom || state.tokenTo) return;
    }

    // Set default tokens only if no tokens are selected or persisted
    const solToken = tokens.find((token) => token.symbol === "SOL");
    const usdcToken = tokens.find((token) => token.symbol === "USDC");

    if (solToken && usdcToken) {
      setTokenFrom(solToken);
      setTokenTo(usdcToken);
    }
  }, [tokens, tokenFrom, tokenTo]); // Run when tokens load or selection changes

  const isSwapDisabled =
    !connected ||
    !tokenFrom ||
    !tokenTo ||
    !amountFrom ||
    !amountTo ||
    isCalculating ||
    isSwapping;

  return (
    <>
      <div className="w-full max-w-[480px] p-4 font-sans">
        <div className="rounded-3xl shadow-xl bg-background dark:bg-background-dark">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-foreground dark:text-foreground-dark">
                Swap
              </h2>
              <SwapSettings
                slippage={slippage}
                onSlippageChange={setSlippage}
                onSave={() => {}}
              />
            </div>

            {/* From Token Input */}
            <div className="themed-card rounded-2xl p-4 mb-2">
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
                    `Balance: ${formatBalance(fromBalance)} ${
                      tokenFrom.symbol
                    }`}
                </div>
                <div className="flex gap-1.5">
                  <button
                    className="h-7 px-2.5 text-xs font-medium rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground"
                    onClick={async () => {
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
                    onClick={async () => {
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
                      const maxAmount = await calculateMaximumInput();
                      if (maxAmount) setAmountFrom(maxAmount);
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
                className="h-9 w-9 cursor-pointer rounded-xl bg-card dark:bg-card-dark hover:bg-accent dark:hover:bg-accent transition-colors flex items-center justify-center shadow-md disabled:opacity-50"
                onClick={swapTokens}
                disabled={isSwapping}
                aria-label="Swap token positions"
              >
                <ArrowDown className="h-4 w-4 text-foreground dark:text-foreground-dark" />
              </button>
            </div>

            {/* To Token Input */}
            <div className="themed-card rounded-2xl p-4 mt-2 bg-muted/20 dark:bg-muted-dark/20">
              <div className="flex justify-between mb-3">
                <input
                  type="number"
                  placeholder="0"
                  value={amountTo}
                  readOnly
                  className="w-full bg-transparent text-xl font-medium p-0 h-auto focus-visible:outline-none focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
              <UnifiedWalletButton
                buttonClassName="font-sans font-semibold rounded-3xl mt-6 themed-button-primary w-full px-4 py-3 text-sm flex justify-center items-center text-center gap-2 hover:opacity-90 dark:hover:opacity-90 transition-colors text-white dark:text-white cursor-pointer"
                overrideContent={
                  <>
                    <WalletIcon className="h-4 w-4 opacity-70" />
                    Connect Wallet
                  </>
                }
              />
            )}

            {/* Powered by Jupiter logo */}
            <div className="flex justify-center mt-6">
              <a
                href="https://jup.ag"
                target="_blank"
                rel="noopener noreferrer"
              >
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
    </>
  );
};

export default Swap;
