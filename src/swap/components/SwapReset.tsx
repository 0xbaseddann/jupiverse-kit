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
      className="p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
      disabled={isCalculating || isSwapping}
      aria-label="Refresh quote"
    >
      <RotateCcw className={`h-4 w-4 ${isCalculating ? "animate-spin" : ""}`} />
    </button>
  );
};

export default SwapReset;
