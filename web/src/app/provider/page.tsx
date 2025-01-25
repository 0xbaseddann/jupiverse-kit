"use client";

import React, { useEffect, useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const ProviderPage = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const codeSnippet = `
import { JupiverseKitProvider } from "jupiverse-kit";
import { useTheme } from "next-themes";
import { Connection } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

export function WalletProvider({ children }) {
  const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL);
  const wallet = useWallet();
  const { theme } = useTheme();

  return (
    <JupiverseKitProvider
      endpoint={process.env.NEXT_PUBLIC_RPC_URL}
      theme={theme}
      autoConnect={true}
      lang="en"
      env="mainnet-beta"
      walletConnectProjectId={process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}
      metadata={{
        name: "Jupiverse Kit",
        description: "Jupiverse Kit",
        url: "https://jupiversekit.vercel.app",
        iconUrls: ["https://jupiversekit.vercel.app/favicon.ico"],
      }}
    >
      {children}
    </JupiverseKitProvider>
  );
}
`;

  const editorTheme =
    resolvedTheme === "dark" || resolvedTheme === "light"
      ? resolvedTheme
      : "light";

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <motion.h1
        className="text-xl md:text-2xl font-bold mb-4 text-black dark:text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        wallet-provider.tsx
      </motion.h1>
      <motion.div
        className="w-full max-w-full md:max-w-2xl shadow-lg rounded-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <CodeEditor
          value={codeSnippet}
          language="jsx"
          padding={15}
          readOnly={true}
          data-color-mode={editorTheme}
          style={{
            fontSize: 12,
            fontFamily:
              "ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace",
            maxHeight: "400px",
            overflow: "auto",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ProviderPage;
