import React from "react";

import SwapTokenImage from "./SwapTokenImage";

import { Token } from "../hooks/useTokens";

import { ChevronDown, Coins } from "lucide-react";

const SwapTokenButton = ({
  token,
  onClick,
}: {
  token: Token | null;
  onClick: () => void;
}) => (
  <button
    className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-2xl text-sm font-medium transition-all hover:bg-muted/20 dark:hover:bg-muted-dark/20 bg-background dark:bg-background-dark w-fit text-foreground dark:text-foreground-dark shadow-sm hover:shadow-md"
    onClick={onClick}
  >
    {token ? (
      <>
        <div className="w-5 h-5 relative rounded-full overflow-hidden bg-muted/10 dark:bg-muted-dark/10 flex items-center justify-center">
          <SwapTokenImage token={token} />
        </div>
        <span className="whitespace-nowrap font-semibold">{token.symbol}</span>
      </>
    ) : (
      <>
        <Coins className="h-5 w-5 text-muted dark:text-muted-dark" />
        <span className="whitespace-nowrap">Select token</span>
      </>
    )}
    <ChevronDown className="h-5 w-5 text-muted dark:text-muted-dark ml-0.5" />
  </button>
);

export default SwapTokenButton;
