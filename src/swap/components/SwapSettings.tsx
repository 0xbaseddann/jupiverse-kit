import React from "react";

import * as Dialog from "@radix-ui/react-dialog";

import { Settings } from "lucide-react";

interface SwapSettingsProps {
  slippage: number;
  onSlippageChange: (slippage: number) => void;
  onSave: () => void;
}

const SwapSettings = ({
  slippage,
  onSlippageChange,
  onSave,
}: SwapSettingsProps) => {
  const [open, setOpen] = React.useState(false);
  const [tempSlippage, setTempSlippage] = React.useState(slippage.toString());
  const [error, setError] = React.useState<string | null>(null);

  const handleSave = () => {
    const slippageValue = parseFloat(tempSlippage);
    if (slippageValue < 0.01 || slippageValue > 100) {
      setError("Slippage must be between 0.01% and 100%");
      return;
    }
    onSlippageChange(slippageValue);
    onSave();
    setOpen(false);
  };

  const handleSlippageChange = (value: string) => {
    setError(null);
    setTempSlippage(value);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="inline-flex items-center justify-center rounded-full h-8 w-8 transition-colors text-muted dark:text-foreground-dark hover:bg-card dark:hover:bg-card-dark  hover:text-foreground dark:hover:text-foreground-dark"
          aria-label="Open swap settings"
        >
          <Settings className="h-4 w-4" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className=" fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-40" />
        <Dialog.Content className="font-sans fixed left-0 right-0 bottom-0 sm:left-[50%] sm:bottom-auto sm:top-[50%] max-h-[85vh] w-full sm:w-[95vw] sm:max-w-[400px] sm:translate-x-[-50%] sm:translate-y-[-50%] rounded-t-[20px] sm:rounded-[20px] bg-card dark:bg-card-dark p-4 sm:p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom sm:data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-bottom sm:data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-bottom sm:data-[state=open]:slide-in-from-left-1/2 sm:data-[state=open]:slide-in-from-top-[48%] z-50">
          <Dialog.Title className="text-xl font-semibold mb-6 text-foreground dark:text-foreground-dark">
            Settings
          </Dialog.Title>
          <div className="grid gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="slippage"
                  className="text-sm font-medium text-foreground dark:text-foreground-dark"
                >
                  Max Slippage
                </label>
                <button
                  className="inline-flex items-center justify-center rounded-full px-3 text-sm h-8 bg-muted/20 hover:bg-muted/30 dark:bg-muted-dark/20 dark:hover:bg-muted-dark/30 text-foreground dark:text-foreground-dark transition-colors"
                  onClick={() => {
                    setTempSlippage("3");
                    setError(null);
                  }}
                >
                  Reset
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="slippage"
                  type="number"
                  value={tempSlippage}
                  onChange={(e) => handleSlippageChange(e.target.value)}
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none flex h-12 w-full rounded-2xl border border-input dark:border-input-dark bg-background dark:bg-background-dark px-4 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:focus-visible:ring-ring-dark focus-visible:ring-offset-2"
                  step="0.1"
                  min="0.01"
                  max="100"
                />
                <span className="text-base text-foreground dark:text-foreground-dark">
                  %
                </span>
              </div>
              {error && (
                <p className="text-sm text-destructive dark:text-destructive-dark">
                  {error}
                </p>
              )}
              <p className="text-sm text-muted-foreground dark:text-muted-dark-foreground">
                Your transaction will revert if the price changes unfavorably by
                more than this percentage.
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="inline-flex items-center justify-center rounded-2xl text-sm font-medium h-8 px-6 bg-primary dark:bg-primary-dark text-primary-foreground dark:text-primary-dark-foreground hover:opacity-90 transition-opacity"
              >
                Confirm
              </button>
            </div>
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 rounded-full p-2 opacity-70 hover:opacity-100 hover:bg-muted/20 dark:hover:bg-muted-dark/20 transition-all"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SwapSettings;
