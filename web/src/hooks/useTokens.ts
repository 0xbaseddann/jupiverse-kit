import { useEffect, useState } from "react";

export interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  tags: string[];
  daily_volume: number;
  freeze_authority: string | null;
  mint_authority: string | null;
}

export const useTokens = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://tokens.jup.ag/tokens?tags=verified"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tokens");
        }
        const data = await response.json();
        setTokens(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch tokens");
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return { tokens, loading, error };
};
