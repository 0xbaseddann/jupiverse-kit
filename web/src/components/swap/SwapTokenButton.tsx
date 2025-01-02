import { ChevronDown, Coins } from "lucide-react";
import * as Slot from "@radix-ui/react-slot";
import SwapTokenImage from "./SwapTokenImage";
import { Token } from "@/hooks/useTokens";

const SwapTokenButton = ({
  token,
  onClick,
}: {
  token: Token | null;
  onClick: () => void;
}) => (
  <button
    className="inline-flex items-center justify-center gap-2 h-8 px-3 font-semibold rounded-md text-sm transition-colors hover:bg-accent bg-transparent w-fit"
    onClick={onClick}
  >
    {token ? (
      <>
        <div className="w-6 h-6 relative rounded-full overflow-hidden bg-muted flex items-center justify-center">
          <SwapTokenImage token={token} />
        </div>
        <span className="whitespace-nowrap">{token.symbol}</span>
      </>
    ) : (
      <>
        <Coins className="h-4 w-4 text-muted-foreground" />
        <span className="whitespace-nowrap">Select token</span>
      </>
    )}
    <ChevronDown className="h-4 w-4 flex-shrink-0" />
  </button>
);

export default SwapTokenButton;
