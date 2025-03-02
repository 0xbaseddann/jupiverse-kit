import { IntegratedTerminal } from "jupiverse-kit";
import { toast } from "sonner";

export default function IntegratedTerminalDemo() {
  return (
    <IntegratedTerminal
      rpcUrl={process.env.NEXT_PUBLIC_RPC_URL}
      onSuccess={({ txid, swapResult }) => {
        console.log("Swap successful:", txid);
        toast.success("Swap successful: " + txid);
      }}
      onSwapError={({ error }) => {
        toast.error(
          `Error: ${error?.toString() || "An unknown error occurred"}`
        );
      }}
      containerStyles={{
        zIndex: 100,
        width: "480px",
        height: "500px",
        display: "flex",
      }}
    />
  );
}
