import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Settings } from "lucide-react";

interface SwapSettingsProps {
  slippage: number;
  onSlippageChange: (slippage: number) => void;
  onSave: () => void;
}

export const SwapSettings = ({
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
          className="inline-flex items-center justify-center rounded-md h-8 w-8 transition-colors hover:bg-accent bg-transparent"
          aria-label="Open swap settings"
        >
          <Settings className="h-4 w-4" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-0 right-0 bottom-0 sm:left-[50%] sm:bottom-auto sm:top-[50%] max-h-[85vh] w-full sm:w-[95vw] sm:max-w-[425px] sm:translate-x-[-50%] sm:translate-y-[-50%] rounded-t-lg sm:rounded-lg bg-background p-4 sm:p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom sm:data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-bottom sm:data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-bottom sm:data-[state=open]:slide-in-from-left-1/2 sm:data-[state=open]:slide-in-from-top-[48%]">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Swap Settings
          </Dialog.Title>
          <div className="grid gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="slippage"
                  className="text-sm font-medium leading-none"
                >
                  Max Slippage Tolerance
                </label>
                <button
                  className="inline-flex items-center justify-center rounded-md px-3 text-sm h-8 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                  onClick={() => {
                    setTempSlippage("3");
                    setError(null);
                  }}
                >
                  Auto (3%)
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="slippage"
                  type="number"
                  value={tempSlippage}
                  onChange={(e) => handleSlippageChange(e.target.value)}
                  className="flex h-12 sm:h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  step="0.1"
                  min="0.01"
                  max="100"
                />
                <span className="text-base sm:text-sm text-muted-foreground">
                  %
                </span>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <p className="text-sm text-muted-foreground">
                Your transaction will revert if the price changes unfavorably by
                more than this percentage.
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSave}
                className="inline-flex items-center justify-center rounded-md text-base sm:text-sm font-medium h-12 sm:h-10 px-6 sm:px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Save Changes
              </button>
            </div>
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
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
                className="h-5 w-5 sm:h-4 sm:w-4"
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
