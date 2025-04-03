import { Swap } from "jupiverse-kit";

export default function SwapDemo() {
  return (
    <Swap
      rpcUrl={
        process.env.NEXT_PUBLIC_RPC_URL || "https://api.mainnet-beta.solana.com"
      }
      referralKey={process.env.NEXT_PUBLIC_REFERRAL_KEY as string}
      platformFeeBps={20}
      apiKey={process.env.NEXT_PUBLIC_JUPITER_API_KEY as string}
    />
  );
}
