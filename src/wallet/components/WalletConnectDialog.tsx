import React from "react";

import { useWallet } from "@solana/wallet-adapter-react";

import * as Dialog from "@radix-ui/react-dialog";

import { X } from "lucide-react";

interface WalletConnectDialogProps {
  open: boolean;
  onClose: () => void;
}

export const WalletConnectDialog = ({
  open,
  onClose,
}: WalletConnectDialogProps) => {
  const { wallets, select } = useWallet();

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-40" />
        <Dialog.Content className="font-sans fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 h-auto w-[95vw] sm:w-[480px] rounded-[24px] bg-card/95 dark:bg-card-dark/95 backdrop-blur-md shadow-2xl border border-border/10 dark:border-border-dark/10 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border/10 dark:border-border-dark/10">
            <Dialog.Title className="text-lg sm:text-xl font-bold bg-gradient-to-r from-nebula to-cosmic bg-clip-text text-transparent dark:from-helix dark:to-trifid">
              Connect Wallet
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="rounded-full p-1.5 sm:p-2 opacity-70 hover:opacity-100 hover:bg-muted/10 dark:hover:bg-muted-dark/10 transition-all"
                aria-label="Close"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Wallet List */}
          <div className="flex-1 overflow-y-auto min-h-0 px-3 sm:px-4 scrollbar-thin scrollbar-thumb-muted/20 dark:scrollbar-thumb-muted-dark/20 scrollbar-track-transparent">
            <div className="space-y-1 py-2">
              {wallets.map((wallet) => (
                <button
                  key={wallet.adapter.name}
                  onClick={() => {
                    select(wallet.adapter.name);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-2xl hover:bg-muted/5 dark:hover:bg-muted/5 active:bg-muted/10 dark:active:bg-muted-dark/10 transition-all duration-200 text-foreground dark:text-foreground-dark group"
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 relative rounded-full overflow-hidden bg-gradient-to-br from-nebula/10 to-cosmic/10 dark:from-helix/10 dark:to-trifid/10 flex items-center justify-center group-hover:shadow-lg transition-shadow duration-200">
                    {wallet.adapter.icon && (
                      <img
                        src={wallet.adapter.icon}
                        alt={wallet.adapter.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-xs sm:text-sm">
                      {wallet.adapter.name}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground/80 dark:text-muted-dark-foreground/80">
                      {wallet.readyState === "Installed"
                        ? "Detected"
                        : "Not Detected"}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
