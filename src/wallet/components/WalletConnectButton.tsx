import React, { useState, useEffect } from "react";

import { WalletConnectDialog } from "./WalletConnectDialog";

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
            font-sans relative group flex items-center gap-2 h-10 px-4 py-2 rounded-2xl
            font-semibold text-sm transition-all duration-200 whitespace-nowrap shadow-md
            bg-trifid dark:bg-trifid hover:opacity-90 text-white
            ${className}
          `}
        >
          {connected ? (
            <>
              <div className="flex items-center gap-2">
                {wallet?.adapter.icon && (
                  <div className="relative w-5 h-5 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm p-0.5">
                    <img
                      src={wallet.adapter.icon}
                      alt={`${wallet.adapter.name} icon`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <span className="text-white font-bold">{address}</span>
                <ChevronDown
                  className={`h-4 w-4 text-white opacity-70 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">Connect Wallet</span>
            </div>
          )}
        </button>

        {isDropdownOpen && connected && (
          <div className="absolute right-0 mt-2 rounded-xl shadow-xl bg-card dark:bg-card-dark backdrop-blur-md z-50 w-full overflow-hidden">
            <button
              onClick={() => {
                disconnect();
                setIsDropdownOpen(false);
              }}
              className="font-sans font-semibold bg-trifid dark:bg-trifid w-full px-4 py-3 text-sm text-left flex items-center gap-2 hover:opacity-90 dark:hover:opacity-90 transition-colors text-white dark:text-white"
            >
              <LogOut className="h-4 w-4 opacity-70" />
              Disconnect
            </button>
          </div>
        )}
      </div>

      <WalletConnectDialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
