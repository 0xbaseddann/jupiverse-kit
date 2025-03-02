import { WidgetPosition } from "@/lib/types";
import { cn } from "@/lib/utils";
import { WidgetTerminal } from "jupiverse-kit";
import {
  ArrowDownLeft,
  ArrowDownRight,
  ArrowUpLeft,
  ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";

interface WidgetTerminalDemoProps {
  position: WidgetPosition;
  setPosition: (position: WidgetPosition) => void;
  key: number;
  setKey: (key: number) => void;
}

export default function WidgetTerminalDemo({
  position,
  setPosition,
  key,
  setKey,
}: WidgetTerminalDemoProps) {
  const handlePositionChange = (newPosition: WidgetPosition) => {
    setPosition(newPosition);
  };

  return (
    <div>
      <div className="bg-black/10 dark:bg-white/10 rounded-2xl flex items-center justify-center w-full md:w-[384px] h-[216px] relative">
        <span className="text-xs text-black/50 dark:text-white/50 text-center w-[70%]">
          Click on the arrows to see how the Jupiter Widget will appear on your
          web browser.
          <br />
          Click on the logo to view the Jupiter Swap Modal.
        </span>

        {/* Top left  */}
        <div
          className={cn(
            "absolute left-0 top-0 cursor-pointer hover:bg-black/20 dark:hover:bg-white/20 rounded-full p-1",
            {
              "text-green-500": position === "top-left",
            }
          )}
          onClick={() => handlePositionChange("top-left")}
        >
          <ArrowUpLeft className="h-5 w-5" />
        </div>

        {/* Top right  */}
        <div
          className={cn(
            "absolute right-0 top-0 cursor-pointer hover:bg-black/20 dark:hover:bg-white/20 rounded-full p-1",
            {
              "text-green-500": position === "top-right",
            }
          )}
          onClick={() => handlePositionChange("top-right")}
        >
          <ArrowUpRight className="h-5 w-5" />
        </div>

        {/* Bottom left  */}
        <div
          className={cn(
            "absolute left-0 bottom-0 cursor-pointer hover:bg-black/20 dark:hover:bg-white/20 rounded-full p-1",
            {
              "text-green-500": position === "bottom-left",
            }
          )}
          onClick={() => handlePositionChange("bottom-left")}
        >
          <ArrowDownLeft className="h-5 w-5" />
        </div>

        {/* Bottom right  */}
        <div
          className={cn(
            "absolute right-0 bottom-0 cursor-pointer hover:bg-black/20 dark:hover:bg-white/20 rounded-full p-1",
            {
              "text-green-500": position === "bottom-right",
            }
          )}
          onClick={() => handlePositionChange("bottom-right")}
        >
          <ArrowDownRight className="h-5 w-5" />
        </div>
      </div>
      <WidgetTerminal
        key={key}
        rpcUrl={process.env.NEXT_PUBLIC_RPC_URL}
        widgetPosition={position}
        widgetSize="default"
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
    </div>
  );
}
