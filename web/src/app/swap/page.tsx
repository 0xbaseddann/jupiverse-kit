import React from "react";

import Swap from "@/components/swap/Swap";

const Page = () => {
  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      <Swap
        rpcUrl={`https://mainnet.helius-rpc.com/?api-key=${process.env.NEXT_PUBLIC_HELIUS_API_KEY}`}
      />
    </main>
  );
};

export default Page;
