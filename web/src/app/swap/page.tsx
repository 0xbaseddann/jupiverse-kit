"use client";

import React from "react";
import { motion } from "framer-motion";
import { Swap } from "jupiverse-kit";

const SwapPage = () => {
  return (
    <motion.div
      className="min-h-screen w-full flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <Swap
        rpcUrl={
          process.env.NEXT_PUBLIC_RPC_URL ||
          "https://api.mainnet-beta.solana.com"
        }
        referralKey={process.env.NEXT_PUBLIC_REFERRAL_KEY as string}
        platformFeeBps={20}
      />
    </motion.div>
  );
};

export default SwapPage;
