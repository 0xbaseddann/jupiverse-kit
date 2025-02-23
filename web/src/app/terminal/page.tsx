"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  IntegratedTerminal,
  WidgetTerminal,
  ModalTerminal,
} from "jupiverse-kit";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TerminalPage = () => {
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
            <TabsTrigger value="integrated" className="flex-1">
              Integrated
            </TabsTrigger>
            <TabsTrigger value="widget" className="flex-1">
              Widget
            </TabsTrigger>
            <TabsTrigger value="modal" className="flex-1">
              Modal
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="integrated"
            className="flex justify-center flex-grow overflow-auto pt-6"
          >
            <div className="w-full h-full relative justify-center items-center">
              <IntegratedTerminal
                rpcUrl={process.env.NEXT_PUBLIC_RPC_URL}
                onSuccess={({ txid, swapResult }) => {
                  console.log("Swap successful:", txid);
                }}
                containerStyles={{
                  zIndex: 100,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                }}
              />
            </div>
          </TabsContent>

          <TabsContent
            value="widget"
            className="flex justify-center flex-grow overflow-auto pt-6"
          >
            <WidgetTerminal
              rpcUrl={process.env.NEXT_PUBLIC_RPC_URL}
              widgetPosition="bottom-right"
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
              buttonText="Launch Terminal"
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
