"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  IntegratedTerminal,
  WidgetTerminal,
  ModalTerminal,
} from "jupiverse-kit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WidgetPosition } from "@/lib/types";
import {
  ArrowDownLeft,
  ArrowDownRight,
  ArrowUpLeft,
  ArrowUpRight,
} from "lucide-react";
import cn from "clsx";

const TerminalPage = () => {
  const [position, setPosition] = useState<WidgetPosition>("bottom-right");
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [position]);

  const handlePositionChange = (newPosition: WidgetPosition) => {
    setPosition(newPosition);
  };

  return (
    <motion.div
      className="h-screen w-full p-8 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-center h-full w-full pt-24">
        <Tabs defaultValue="integrated" className="h-full w-full">
          <TabsList className="w-full flex justify-center mb-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <TabsTrigger
              value="integrated"
              className="flex-1 text-black hover:bg-gray-200 transition-colors"
            >
              Integrated
            </TabsTrigger>
            <TabsTrigger
              value="widget"
              className="flex-1 text-black hover:bg-gray-200 transition-colors"
            >
              Widget
            </TabsTrigger>
            <TabsTrigger
              value="modal"
              className="flex-1 text-black hover:bg-gray-200 transition-colors"
            >
              Modal
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="integrated"
            className="flex justify-center flex-grow overflow-auto pt-3"
          >
            <div className="w-full h-full relative justify-center items-center">
              <IntegratedTerminal
                rpcUrl={process.env.NEXT_PUBLIC_RPC_URL}
                onSuccess={({ txid, swapResult }) => {
                  console.log("Swap successful:", txid);
                }}
                containerStyles={{
                  zIndex: 100,
                  width: "400px",
                  height: "568px",
                  display: "flex",
                }}
              />
            </div>
          </TabsContent>

          <TabsContent
            value="widget"
            className="flex justify-center flex-grow overflow-auto pt-6"
          >
            <div className="bg-black/10 dark:bg-white/10 rounded-2xl flex items-center justify-center w-full md:w-[384px] h-[216px] relative">
              <span className="text-xs text-black/50 dark:text-white/50 text-center w-[70%]">
                Click on the arrows to see how the Jupiter Widget will appear on
                your web browser.
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
              }}
            />
          </TabsContent>

          <TabsContent
            value="modal"
            className="flex items-center justify-center flex-grow overflow-auto pt-20"
          >
            <ModalTerminal
              rpcUrl={process.env.NEXT_PUBLIC_RPC_URL}
              buttonText="Launch Modal Terminal"
              buttonClassName="flex items-center justify-center px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 dark:bg-green-400 dark:hover:bg-green-600 dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
              onSuccess={({ txid, swapResult }) => {
                console.log("Swap successful:", txid);
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default TerminalPage;
