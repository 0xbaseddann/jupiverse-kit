import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useCallback, useEffect, useState } from "react";
import { Token } from "./useTokens";

export const useTokenBalance = (token: Token | null) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBalance = useCallback(async () => {
    if (!publicKey || !token) {
      console.log("No publicKey or token", { publicKey, token });
      setBalance(null);
      return;
    }

    try {
      setLoading(true);
      console.log("Fetching balance for token:", token.symbol);

      if (token.symbol === "SOL") {
        const balance = await connection.getBalance(publicKey, "finalized");
        console.log("SOL balance in lamports:", balance);
        const solBalance = balance / Math.pow(10, 9);
        console.log("SOL balance:", solBalance);
        setBalance(solBalance);
      } else {
        console.log("Fetching SPL token balance for:", token.address);
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
          console.log("Token amount data:", tokenAmount);
          const balance = tokenAmount.uiAmount;
          console.log("Final token balance:", balance);
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
