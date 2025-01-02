import React, { useState } from "react";

import { Token } from "../hooks/useTokens";

import { Coins } from "lucide-react";

const SwapTokenImage = ({ token }: { token: Token }) => {
  const [imgError, setImgError] = useState(false);

  if (!token.logoURI || imgError) {
    return <Coins className="h-4 w-4 text-muted-foreground" />;
  }

  return (
    <img
      src={token.logoURI}
      alt={token.symbol}
      className="w-full h-full object-cover"
      onError={() => setImgError(true)}
      loading="lazy"
      crossOrigin="anonymous"
    />
  );
};

export default SwapTokenImage;
