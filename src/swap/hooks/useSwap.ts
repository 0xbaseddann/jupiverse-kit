import { useCallback, useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  VersionedTransaction,
} from "@solana/web3.js";
import { Token } from "./useTokens";
import { QuoteResponse, SwapResponse } from "../utils/interfaces";

// Minimum SOL to keep for gas fees (0.01 SOL)
const MIN_SOL_FOR_GAS = 0.01 * LAMPORTS_PER_SOL;
const WSOL_MINT = "So11111111111111111111111111111111111111112";

interface UseSwapProps {
  rpcUrl: string;
  referralKey?: string;
  platformFeeBps?: number;
}

export const useSwap = ({
  rpcUrl,
  referralKey,
  platformFeeBps,
}: UseSwapProps) => {
  const { publicKey, signTransaction } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize connection with provided RPC URL
  const connection = useMemo(() => new Connection(rpcUrl), [rpcUrl]);

  // Get quote for swap
  const getQuote = useCallback(
    async (
      inputToken: Token,
      outputToken: Token,
      amount: number,
      slippageBps: number = 300
    ) => {
      try {
        setLoading(true);
        setError(null);

        const url = new URL("https://quote-api.jup.ag/v6/quote");
        url.searchParams.append("inputMint", inputToken.address);
        url.searchParams.append("outputMint", outputToken.address);
        url.searchParams.append(
          "amount",
          (amount * Math.pow(10, inputToken.decimals)).toString()
        );
        url.searchParams.append("slippageBps", slippageBps.toString());
        // Add this line
        url.searchParams.append("restrictIntermediateTokens", "true");

        // Add platform fee if provided
        if (platformFeeBps) {
          url.searchParams.append("platformFeeBps", platformFeeBps.toString());
        }

        const response = await fetch(url.toString());
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to get quote");
        }

        return data as QuoteResponse;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to get quote";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [platformFeeBps]
  );

  // Execute swap
  const executeSwap = useCallback(
    async (quoteResponse: QuoteResponse) => {
      if (!publicKey || !signTransaction) {
        setError("Wallet not connected");
        return null;
      }

      try {
        setLoading(true);
        setError(null);

        let feeAccount;
        if (referralKey) {
          // Calculate fee account address
          const [feeAccountAddress] = await PublicKey.findProgramAddressSync(
            [
              Buffer.from("referral_ata"),
              new PublicKey(referralKey).toBuffer(),
              new PublicKey(quoteResponse.inputMint).toBuffer(),
            ],
            new PublicKey("REFER4ZgmyYx9c6He5XfaTMiGfdLwRnkV4RPp9t9iF3")
          );
          feeAccount = feeAccountAddress.toString();
        }

        const swapResponse = await fetch("https://quote-api.jup.ag/v6/swap", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quoteResponse,
            userPublicKey: publicKey.toString(),
            wrapAndUnwrapSol: true,
            dynamicComputeUnitLimit: true,
            feeAccount,
            dynamicSlippage: {
              maxBps: quoteResponse.slippageBps,
            },
            prioritizationFeeLamports: {
              priorityLevelWithMaxLamports: {
                maxLamports: 10000000,
                priorityLevel: "veryHigh",
              },
            },
          }),
        });

        if (!swapResponse.ok) {
          throw new Error("Failed to prepare swap transaction");
        }

        const { swapTransaction } = (await swapResponse.json()) as SwapResponse;

        // Deserialize the transaction
        const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
        const transaction = VersionedTransaction.deserialize(
          new Uint8Array(swapTransactionBuf.toJSON().data)
        );

        // Sign the transaction
        const signedTransaction = await signTransaction(transaction);

        // Execute the transaction
        const rawTransaction = signedTransaction.serialize();
        const txid = await connection.sendRawTransaction(rawTransaction, {
          skipPreflight: true,
          maxRetries: 2,
        });

        // Get the latest blockhash
        const latestBlockhash = await connection.getLatestBlockhash();

        // Confirm transaction
        await connection.confirmTransaction({
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
          signature: txid,
        });

        return txid;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to execute swap";
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [connection, publicKey, signTransaction, referralKey]
  );

  // Calculate output amount based on input
  const calculateOutputAmount = useCallback(
    async (inputToken: Token, outputToken: Token, inputAmount: number) => {
      if (!inputAmount || inputAmount <= 0) return "0";

      try {
        const quote = await getQuote(inputToken, outputToken, inputAmount);
        if (!quote) return "0";

        // Convert amount from base units to decimal
        const outputAmount = (
          parseInt(quote.otherAmountThreshold) /
          Math.pow(10, outputToken.decimals)
        ).toString();

        return outputAmount;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to calculate output amount";
        console.error("Failed to calculate output amount:", err);
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    [getQuote]
  );

  // Calculate max input amount accounting for gas fees if token is SOL
  const calculateMaxInput = useCallback(
    async (inputToken: Token, balance: number) => {
      if (!balance || balance <= 0) return 0;

      // If input token is SOL, leave some for gas
      if (inputToken.address === WSOL_MINT) {
        const maxAmount = Math.max(
          0,
          (balance * LAMPORTS_PER_SOL - MIN_SOL_FOR_GAS) / LAMPORTS_PER_SOL
        );
        return parseFloat(maxAmount.toFixed(inputToken.decimals));
      }

      // For other tokens, use full balance
      return balance;
    },
    []
  );

  return {
    getQuote,
    executeSwap,
    calculateOutputAmount,
    calculateMaxInput,
    loading,
    error,
  };
};
