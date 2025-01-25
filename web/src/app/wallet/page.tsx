"use client";

import React from "react";
import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";
import { WalletIcon } from "lucide-react";
import { motion } from "framer-motion";

const WalletPage = () => {
  return (
    <motion.div
      className="min-h-screen w-full flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <UnifiedWalletButton
        buttonClassName="font-sans font-semibold rounded-3xl px-4 py-3 text-sm flex justify-center items-center text-center gap-2 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-white dark:text-white cursor-pointer"
        currentUserClassName="font-sans font-semibold min-w-[90px] min-h-[50px] rounded-full px-5 py-3 text-sm flex justify-center items-center text-center gap-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-white dark:text-white cursor-pointer"
        overrideContent={
          <>
            <WalletIcon className="h-4 w-4 opacity-70 cursor-pointer" />
            Connect Wallet
          </>
        }
      />
    </motion.div>
  );
};

export default WalletPage;
