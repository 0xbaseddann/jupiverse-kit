import { ModalTerminal } from "jupiverse-kit";
import { toast } from "sonner";

export default function ModalTerminalDemo() {
  return (
    <ModalTerminal
      rpcUrl={process.env.NEXT_PUBLIC_RPC_URL}
      buttonText="Launch Modal Terminal"
      buttonClassName="bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-3xl flex items-center justify-center w-[90%] max-w-[280px] sm:w-[150px] md:w-[180px] h-[50px] sm:h-[60px] text-sm sm:text-base relative mx-auto sm:mx-0"
      onSuccess={({ txid, swapResult }) => {
        console.log("Swap successful:", txid);
        toast.success("Swap successful: " + txid);
      }}
      onSwapError={({ error }) => {
        toast.error(
          `Error: ${error?.toString() || "An unknown error occurred"}`
        );
      }}
    />
  );
}
