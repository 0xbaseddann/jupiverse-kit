import React from "react";
import { RotateCcw } from "lucide-react";

interface SwapResetProps {
  onRefresh: () => void;
  isCalculating: boolean;
  isSwapping: boolean;
}

const SwapReset = ({
  onRefresh,
  isCalculating,
  isSwapping,
}: SwapResetProps) => {
  return (
    <button
      onClick={onRefresh}
      className="inline-flex items-center justify-center rounded-full h-8 w-8 transition-colors text-muted dark:text-foreground-dark hover:bg-card dark:hover:bg-card-dark  hover:text-foreground dark:hover:text-foreground-dark"
      disabled={isCalculating || isSwapping}
      aria-label="Refresh quote"
    >
      <RotateCcw
        className={`h-4 w-4 ${
          isCalculating ? "animate-spin [direction:reverse]" : ""
        }`}
      />
    </button>
  );
};

export default SwapReset;
