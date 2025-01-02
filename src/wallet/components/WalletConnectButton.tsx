import React, { useState, useEffect } from "react";

import { WalletConnectModal } from "./WalletConnectModal";

import { useWallet } from "@solana/wallet-adapter-react";

import { ChevronDown, LogOut } from "lucide-react";

export const WalletConnectButton = ({ className }: { className?: string }) => {
  const { connected, publicKey, disconnect, wallet } = useWallet();
  const [address, setAddress] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (publicKey) {
      // Show more characters on larger screens
      const isMobile = window.innerWidth < 768;
      setAddress(
        isMobile
          ? `${publicKey.toString().slice(0, 4)}...${publicKey
              .toString()
              .slice(-4)}`
          : `${publicKey.toString().slice(0, 6)}...${publicKey
              .toString()
              .slice(-4)}`
      );
    }
  }, [publicKey]);

  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      if (publicKey) {
        const isMobile = window.innerWidth < 768;
        setAddress(
          isMobile
            ? `${publicKey.toString().slice(0, 4)}...${publicKey
                .toString()
                .slice(-4)}`
            : `${publicKey.toString().slice(0, 6)}...${publicKey
                .toString()
                .slice(-4)}`
        );
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [publicKey]);

  useEffect(() => {
    console.log("Wallet connection status:", {
      connected,
      publicKey: publicKey?.toString(),
      wallet: {
        name: wallet?.adapter.name,
        icon: wallet?.adapter.icon,
      },
    });
  }, [connected, publicKey, wallet]);

  const handleClick = () => {
    if (connected) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      setIsModalOpen(true);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".wallet-button-container")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative wallet-button-container">
        <button
          onClick={handleClick}
          className={`
            jupiverse-wallet relative group flex items-center gap-2 h-10 px-3 sm:px-4 py-2 rounded-xl
            font-semibold text-sm transition-all duration-200 whitespace-nowrap
            ${
              connected
                ? "bg-accent hover:bg-accent/80 text-accent-foreground"
                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            }
            ${className}
          `}
        >
          {connected ? (
            <>
              <div className="flex items-center gap-1 sm:gap-2">
                {wallet?.adapter.icon && (
                  <div className="relative w-4 sm:w-5 h-4 sm:h-5 rounded-full overflow-hidden bg-background">
                    <img
                      src={wallet.adapter.icon}
                      alt={`${wallet.adapter.name} icon`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <span className="text-xs sm:text-sm">{address}</span>
                <ChevronDown
                  className={`h-3 sm:h-4 w-3 sm:w-4 opacity-50 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm">Connect Wallet</span>
            </div>
          )}
        </button>

        {isDropdownOpen && connected && (
          <div className="absolute right-0 mt-2 rounded-xl shadow-lg bg-background border border-border z-50 w-full">
            <button
              onClick={() => {
                disconnect();
                setIsDropdownOpen(false);
              }}
              className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-left flex items-center gap-2 hover:bg-accent rounded-xl transition-colors"
            >
              <LogOut className="h-3 sm:h-4 w-3 sm:w-4" />
              Disconnect
            </button>
          </div>
        )}
      </div>

      <WalletConnectModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
