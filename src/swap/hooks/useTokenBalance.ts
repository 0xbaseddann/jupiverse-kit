import { useCallback, useEffect, useState } from "react";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

import { Token } from "../utils/interfaces";

export const useTokenBalance = (token: Token | null) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBalance = useCallback(async () => {
    if (!publicKey || !token) {
      setBalance(null);
      return;
    }

    try {
      setLoading(true);

      if (token.symbol === "SOL") {
        const balance = await connection.getBalance(publicKey, "finalized");
        const solBalance = balance / Math.pow(10, 9);
        setBalance(solBalance);
      } else {
        const tokenAccount = await connection.getParsedTokenAccountsByOwner(
          publicKey,
          {
            programId: TOKEN_PROGRAM_ID,
            mint: new PublicKey(token.address),
          },
          "finalized"
        );

        if (tokenAccount.value.length > 0) {
          const tokenAmount =
            tokenAccount.value[0].account.data.parsed.info.tokenAmount;
          const balance = tokenAmount.uiAmount;
          setBalance(balance);
        } else {
          setBalance(0);
        }
      }
    } catch (error) {
      console.error("Error fetching token balance:", error);
      setBalance(null);
    } finally {
      setLoading(false);
    }
  }, [connection, publicKey, token]);

  // Initial fetch when dependencies change
  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return { balance, loading, refetch: fetchBalance };
};
