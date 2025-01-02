import React, { useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";

import SwapTokenImage from "./SwapTokenImage";

import { useTokens, Token } from "../hooks/useTokens";

import { Search } from "lucide-react";

interface SwapTokenDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
}

const SwapTokenDialog = ({ open, onClose, onSelect }: SwapTokenDialogProps) => {
  const { tokens, loading, error } = useTokens();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTokens = tokens.filter((token: Token) => {
    const query = searchQuery.toLowerCase();
    return (
      token.symbol.toLowerCase().includes(query) ||
      token.name.toLowerCase().includes(query) ||
      token.address.toLowerCase().includes(query)
    );
  });

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-0 right-0 bottom-0 sm:left-[50%] sm:bottom-auto sm:top-[50%] max-h-[85vh] w-full sm:w-[95vw] sm:max-w-md sm:translate-x-[-50%] sm:translate-y-[-50%] rounded-t-lg sm:rounded-lg bg-background p-4 sm:p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom sm:data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-bottom sm:data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-bottom sm:data-[state=open]:slide-in-from-left-1/2 sm:data-[state=open]:slide-in-from-top-[48%]">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-semibold">
              Select a token
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
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
          </div>

          <div className="relative mb-4">
            <input
              placeholder="Search by name or paste address"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex h-12 sm:h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-base sm:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 sm:h-4 sm:w-4 text-muted-foreground" />
          </div>

          <div className="overflow-y-auto max-h-[60vh] -mx-4 sm:mx-0">
            {loading ? (
              <div className="text-center py-4">Loading tokens...</div>
            ) : error ? (
              <div className="text-center text-red-500 py-4">{error}</div>
            ) : (
              <div className="space-y-1">
                {filteredTokens.map((token: Token) => (
                  <button
                    key={token.address}
                    className="w-full flex items-center gap-3 p-4 sm:p-3 hover:bg-muted transition-colors"
                    onClick={() => {
                      onSelect(token);
                      onClose();
                    }}
                  >
                    <div className="w-10 h-10 sm:w-8 sm:h-8 relative rounded-full overflow-hidden bg-muted flex items-center justify-center">
                      <SwapTokenImage token={token} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-base sm:text-sm">
                        {token.symbol}
                      </div>
                      <div className="text-sm sm:text-xs text-muted-foreground">
                        {token.name}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SwapTokenDialog;
