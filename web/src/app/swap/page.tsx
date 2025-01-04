import React from "react";

import { Swap } from "jupiverse-kit";

const Page = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Swap
        rpcUrl={
          process.env.NEXT_PUBLIC_RPC_URL ||
          "https://api.mainnet-beta.solana.com"
        }
      />
    </div>
  );
};

export default Page;
