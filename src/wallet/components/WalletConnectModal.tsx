import React from "react";

import { useWallet } from "@solana/wallet-adapter-react";

import * as Dialog from "@radix-ui/react-dialog";

import { X } from "lucide-react";

interface WalletConnectModalProps {
  open: boolean;
  onClose: () => void;
}

export const WalletConnectModal = ({
  open,
  onClose,
}: WalletConnectModalProps) => {
  const { wallets, select } = useWallet();

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-[100]" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] sm:w-[95vw] max-w-[425px] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-background p-4 sm:p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] z-[101] overflow-y-auto">
          <div className="mb-4 sm:mb-6">
            <Dialog.Title className="text-lg sm:text-xl font-bold">
              Connect Wallet
            </Dialog.Title>
            <Dialog.Description className="text-xs sm:text-sm text-muted-foreground mt-1">
              Choose a provider to connect your Solana wallet
            </Dialog.Description>
          </div>

          <div className="grid gap-2">
            {wallets.map((wallet) => (
              <button
                key={wallet.adapter.name}
                onClick={() => {
                  select(wallet.adapter.name);
                  onClose();
                }}
                className="flex items-center gap-2 sm:gap-3 w-full p-3 sm:p-4 rounded-xl border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors text-left"
              >
                {wallet.adapter.icon && (
                  <div className="relative w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-background border border-input">
                    <img
                      src={wallet.adapter.icon}
                      alt={wallet.adapter.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="font-semibold text-sm sm:text-base">
                    {wallet.adapter.name}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {wallet.readyState === "Installed"
                      ? "Detected"
                      : "Not Detected"}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute right-3 sm:right-4 top-3 sm:top-4 rounded-lg opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
