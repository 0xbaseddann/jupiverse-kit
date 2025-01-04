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
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-40" />
        <Dialog.Content className="font-sans fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 max-h-[85vh] w-[95vw] max-w-[600px] rounded-[24px] bg-card/95 dark:bg-card-dark/95 backdrop-blur-md shadow-2xl border border-border/10 dark:border-border-dark/10 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/10 dark:border-border-dark/10">
            <Dialog.Title className="text-xl font-bold bg-gradient-to-r from-nebula to-cosmic bg-clip-text text-transparent dark:from-helix dark:to-trifid">
              Select a token
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="rounded-full p-2 opacity-70 hover:opacity-100 hover:bg-muted/10 dark:hover:bg-muted-dark/10 transition-all"
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
          </div>

          {/* Search */}
          <div className="px-6 py-4">
            <div className="relative">
              <input
                placeholder="Search by name or paste address"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-input/10 dark:border-input-dark/10 bg-background/50 dark:bg-background-dark/50 px-12 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/70 dark:placeholder:text-muted-dark-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nebula/50 dark:focus-visible:ring-helix/50 focus-visible:ring-offset-1 transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/70 dark:text-muted-dark-foreground/70" />
            </div>
          </div>

          {/* Token List */}
          <div className="flex-1 overflow-y-auto min-h-0 px-4">
            {loading ? (
              <div className="flex items-center justify-center h-full text-muted-foreground dark:text-muted-dark-foreground">
                Loading tokens...
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full text-destructive dark:text-destructive-dark">
                {error}
              </div>
            ) : (
              <div className="space-y-1 py-2">
                {filteredTokens.map((token: Token) => (
                  <button
                    key={token.address}
                    className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-muted/5 dark:hover:bg-muted/5 active:bg-muted/10 dark:active:bg-muted-dark/10 transition-all duration-200 text-foreground dark:text-foreground-dark group"
                    onClick={() => {
                      onSelect(token);
                      onClose();
                    }}
                  >
                    <div className="w-6 h-6 relative rounded-full overflow-hidden bg-gradient-to-br from-nebula/10 to-cosmic/10 dark:from-helix/10 dark:to-trifid/10 flex items-center justify-center group-hover:shadow-lg transition-shadow duration-200">
                      <SwapTokenImage token={token} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-sm">
                        {token.symbol}
                      </div>
                      <div className="text-xs text-muted-foreground/80 dark:text-muted-dark-foreground/80">
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
