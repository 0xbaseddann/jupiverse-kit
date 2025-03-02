"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import {
  JUPIVERSEKIT_DEMO_TABS,
  COMPONENT_DESCRIPTIONS,
  codeSnippets,
  codeStyles,
  type Tabs as TabType,
} from "./constants";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  vs,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { WidgetPosition } from "@/lib/types";
import UnifiedWalletKitDemo from "./UnifiedWalletKitDemo";
import SwapDemo from "./SwapDemo";
import IntegratedTerminalDemo from "./TerminalDemo/IntegratedTerminalDemo";
import WidgetTerminalDemo from "./TerminalDemo/WidgetTerminalDemo";
import ModalTerminalDemo from "./TerminalDemo/ModalTerminalDemo";

export default function Playground() {
  const [activeTab, setActiveTab] = useState<TabType>("JupiverseKitProvider");
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"code" | "preview">("code");
  const [terminalType, setTerminalType] = useState<
    "IntegratedTerminal" | "WidgetTerminal" | "ModalTerminal"
  >("IntegratedTerminal");
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const [position, setPosition] = useState<WidgetPosition>("bottom-right");
  const [key, setKey] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePositionChange = (newPosition: WidgetPosition) => {
    setPosition(newPosition);
    setKey((prevKey) => prevKey + 1);
  };

  const handleCopy = useCallback(() => {
    const codeToCopy =
      typeof codeSnippets[activeTab] === "object"
        ? codeSnippets[activeTab][terminalType]
        : codeSnippets[activeTab];

    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [activeTab, terminalType]);

  const demoComponent = useMemo(() => {
    if (!mounted) return null;

    switch (activeTab) {
      case "JupiverseKitProvider":
        return (
          <motion.div
            className="flex items-center justify-center h-full min-h-[300px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center p-4 bg-black/10 dark:bg-white/10 rounded-xl">
              <motion.p
                className="text-black dark:text-white"
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
              >
                As this is a provider component, there is no demo for it.
              </motion.p>
            </div>
          </motion.div>
        );
      case "UnifiedWalletKit":
        return (
          <motion.div
            className="flex items-center justify-center h-full min-h-[300px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-sm font-medium"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <UnifiedWalletKitDemo />
            </motion.div>
          </motion.div>
        );
      case "Swap":
        return (
          <motion.div
            className="flex items-center justify-center h-full min-h-[300px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-black dark:text-white mb-4"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <SwapDemo />
            </motion.div>
          </motion.div>
        );
      case "Terminal":
        if (terminalType === "IntegratedTerminal") {
          return (
            <motion.div
              className="flex items-center justify-center h-full min-h-[300px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-center text-black dark:text-white"
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <IntegratedTerminalDemo />
              </motion.div>
            </motion.div>
          );
        } else if (terminalType === "WidgetTerminal") {
          return (
            <motion.div
              className="flex items-center justify-center h-full min-h-[300px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-center text-black dark:text-white"
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <WidgetTerminalDemo
                  position={position}
                  setPosition={handlePositionChange}
                  key={key}
                  setKey={setKey}
                />
              </motion.div>
            </motion.div>
          );
        } else {
          return (
            <motion.div
              className="flex items-center justify-center h-full min-h-[300px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-center text-black dark:text-white"
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ModalTerminalDemo />
              </motion.div>
            </motion.div>
          );
        }
      default:
        return (
          <motion.div
            className="flex items-center justify-center h-full min-h-[300px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <motion.p
                className="text-black dark:text-white"
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Component preview would appear here
              </motion.p>
            </div>
          </motion.div>
        );
    }
  }, [mounted, activeTab, terminalType, position, key]);

  if (!mounted) {
    return <div className="flex h-[300px] items-center justify-center p-8" />;
  }

  return (
    <motion.section
      className="w-full py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <style>{codeStyles}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Desktop View */}
        <div className="hidden md:block">
          <motion.div
            className={`relative rounded-xl border ${
              isDark ? "border-gray-800 bg-black" : "border-gray-200 bg-white"
            } shadow-lg overflow-hidden`}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className={`flex items-center justify-between border-b py-2 pl-6 pr-2 ${
                isDark ? "border-gray-800" : "border-gray-200"
              }`}
            >
              <div className="flex space-x-4 px-1 overflow-x-auto scrollbar-hide">
                {JUPIVERSEKIT_DEMO_TABS.map((tab, index) => (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab as TabType)}
                    className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? isDark
                          ? "text-white bg-gray-800"
                          : "text-gray-900 bg-gray-100"
                        : isDark
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>

              <div className="ml-auto flex items-center space-x-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg"
                    onClick={handleCopy}
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Check className="h-4 w-4" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Copy className="h-4 w-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </div>
            </div>

            <motion.div
              className={`flex items-center justify-between border-b py-2 pl-6 pr-2 ${
                isDark ? "border-gray-800" : "border-gray-200"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.p
                className="text-sm text-black dark:text-white"
                key={activeTab}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {COMPONENT_DESCRIPTIONS[activeTab]}
              </motion.p>
            </motion.div>

            {activeTab === "Terminal" && (
              <motion.div
                className={`flex items-center border-b py-2 pl-6 pr-2 justify-center ${
                  isDark ? "border-gray-800" : "border-gray-200"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex space-x-4 px-1 overflow-x-auto scrollbar-hide justify-center w-full gap-2">
                  {[
                    "IntegratedTerminal",
                    "WidgetTerminal",
                    "ModalTerminal",
                  ].map((type, index) => (
                    <motion.button
                      key={type}
                      onClick={() =>
                        setTerminalType(
                          type as
                            | "IntegratedTerminal"
                            | "WidgetTerminal"
                            | "ModalTerminal"
                        )
                      }
                      className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                        terminalType === type
                          ? isDark
                            ? "text-white bg-gray-800"
                            : "text-gray-900 bg-gray-100"
                          : isDark
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {type === "IntegratedTerminal"
                        ? "Integrated"
                        : type === "WidgetTerminal"
                        ? "Widget"
                        : "Modal"}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2">
              <motion.div
                className={`h-full min-h-[300px] p-6 lg:p-8 border-b lg:border-b-0 lg:border-r flex items-center justify-center ${
                  isDark ? "border-gray-800" : "border-gray-200"
                }`}
                key={`preview-${activeTab}-${terminalType}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeTab}-${terminalType}-${position}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {demoComponent}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              <motion.div
                className="h-[300px] py-4 px-4 lg:h-[400px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="code-snippet h-full overflow-auto rounded-lg">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeTab}-${terminalType}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <SyntaxHighlighter
                        language="tsx"
                        style={isDark ? vscDarkPlus : vs}
                        showLineNumbers
                        customStyle={{
                          margin: 0,
                          borderRadius: "0.5rem",
                          background: "transparent",
                          height: "100%",
                          fontSize: "0.875rem",
                        }}
                      >
                        {activeTab === "Terminal"
                          ? codeSnippets[activeTab][terminalType]
                          : codeSnippets[activeTab]}
                      </SyntaxHighlighter>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden">
          <motion.div
            className={`relative rounded-xl border ${
              isDark ? "border-gray-800 bg-black" : "border-gray-200 bg-white"
            } shadow-lg overflow-hidden`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div
              className={`flex flex-col space-y-2 border-b py-3 px-4 ${
                isDark ? "border-gray-800" : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <motion.div
                  className="flex-1 overflow-x-auto scrollbar-hide"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Select
                    value={activeTab}
                    onValueChange={(value) => setActiveTab(value as TabType)}
                  >
                    <SelectTrigger
                      className="w-full text-black dark:text-white rounded-none"
                      aria-label="Select component"
                    >
                      <SelectValue placeholder="Select component" />
                    </SelectTrigger>
                    <SelectContent>
                      {JUPIVERSEKIT_DEMO_TABS.map((tab) => (
                        <SelectItem key={tab} value={tab}>
                          {tab}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>

              {activeTab === "Terminal" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="flex justify-center"
                >
                  <div className="flex space-x-2 px-1 overflow-x-auto scrollbar-hide">
                    {[
                      "IntegratedTerminal",
                      "WidgetTerminal",
                      "ModalTerminal",
                    ].map((type, index) => (
                      <motion.button
                        key={type}
                        onClick={() =>
                          setTerminalType(
                            type as
                              | "IntegratedTerminal"
                              | "WidgetTerminal"
                              | "ModalTerminal"
                          )
                        }
                        className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                          terminalType === type
                            ? isDark
                              ? "text-white bg-gray-800"
                              : "text-gray-900 bg-gray-100"
                            : isDark
                            ? "text-gray-400 hover:text-white"
                            : "text-gray-500 hover:text-gray-900"
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {type === "IntegratedTerminal"
                          ? "Integrated"
                          : type === "WidgetTerminal"
                          ? "Widget"
                          : "Modal"}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <Tabs
                  defaultValue="code"
                  className="w-full"
                  onValueChange={(value) =>
                    setViewMode(value as "code" | "preview")
                  }
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="code">Code</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                </Tabs>
              </motion.div>

              <motion.p
                className="text-xs text-black dark:text-white"
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {COMPONENT_DESCRIPTIONS[activeTab]}
              </motion.p>
            </div>

            <div className="grid grid-cols-1">
              <AnimatePresence mode="wait">
                {viewMode === "preview" ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`h-full min-h-[250px] p-6 flex items-center justify-center ${
                      isDark ? "border-gray-800" : "border-gray-200"
                    }`}
                  >
                    {demoComponent}
                  </motion.div>
                ) : (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-[300px] p-4"
                  >
                    <div className="code-snippet h-full overflow-auto rounded-lg">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${activeTab}-${terminalType}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <SyntaxHighlighter
                            language="tsx"
                            style={isDark ? vscDarkPlus : vs}
                            showLineNumbers
                            customStyle={{
                              margin: 0,
                              borderRadius: "0.5rem",
                              background: "transparent",
                              height: "100%",
                              fontSize: "0.75rem",
                            }}
                          >
                            {activeTab === "Terminal"
                              ? codeSnippets[activeTab][terminalType]
                              : codeSnippets[activeTab]}
                          </SyntaxHighlighter>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {viewMode === "code" && (
              <motion.div
                className="p-2 flex justify-end border-t border-gray-800"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg"
                    onClick={handleCopy}
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          <span>Copied</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          <span>Copy</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
