"use client";

import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";
import { Check, Clipboard } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Separator } from "../ui/separator";

const Hero = () => {
  const [copied, setCopied] = useState(false);

  const installCommands = {
    npm: "npm i jupiverse-kit",
    pnpm: "pnpm i jupiverse-kit",
    yarn: "yarn add jupiverse-kit",
    bun: "bun add jupiverse-kit",
  };

  const [selectedCommand, setSelectedCommand] =
    useState<keyof typeof installCommands>("npm");

  const handleCopy = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto flex flex-col items-center text-center justify-center text-primary py-5 sm:py-18 px-4 sm:px-6">
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center !leading-tight text-primary-foreground dark:text-primary-dark-foreground"
      >
        <Highlight className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent text-5xl bg-clip-text rounded-xl">
          Jupiverse Kit
        </Highlight>
      </motion.h1>
      <motion.p
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0.0, 0.2, 1],
          delay: 0.2,
        }}
        className="text-center mt-3  text-sm sm:text-base md:text-lg lg:text-xl md:max-w-prose mx-auto font-medium text-muted-foreground dark:text-cloud px-6 sm:px-0"
      >
        The ultimate ready-to-use React components library&nbsp;
        <br className="hidden sm:block" />
        for building onchain applications on Solana effortlessly.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0.0, 0.2, 1],
          delay: 0.4,
        }}
        className="mt-6"
      >
        <Image
          src="/jupiter/poweredbyjupiter-bright.svg"
          alt="Powered by Jupiter"
          width={180}
          height={36}
          className="w-[180px] h-[36px] sm:w-[220px] sm:h-[44px] dark:hidden"
        />
        <Image
          src="/jupiter/poweredbyjupiter-dark.svg"
          alt="Powered by Jupiter"
          width={180}
          height={36}
          className="w-[180px] h-[36px] sm:w-[220px] sm:h-[44px] hidden dark:block"
        />
      </motion.div>
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: [10, -2, 0],
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0.0, 0.2, 1],
          delay: 0.4,
        }}
        className="mt-6 sm:mt-10 flex flex-col items-center justify-center w-full"
      >
        <div className="relative w-full max-w-[500px] mx-auto bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-300 dark:border-gray-700">
          <div className="w-full">
            <div className="flex w-full justify-between mb-1">
              <div className="flex gap-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-lg">
                {Object.keys(installCommands).map((pkg) => (
                  <button
                    key={pkg}
                    onClick={() =>
                      setSelectedCommand(pkg as keyof typeof installCommands)
                    }
                    className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      selectedCommand === pkg
                        ? "bg-white dark:bg-gray-800 text-black dark:text-white shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                    }`}
                  >
                    {pkg}
                  </button>
                ))}
              </div>
              <Button
                onClick={() => handleCopy(installCommands[selectedCommand])}
                className="text-black dark:text-white bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 shadow-none flex items-center gap-1 p-3 transition-colors duration-200"
              >
                {copied ? (
                  <Check className="w-2 h-2" />
                ) : (
                  <Clipboard className="w-2 h-2" />
                )}
              </Button>
            </div>
            <Separator className="mb-4 opacity-15 dark:opacity-30 dark:bg-white mt-3" />
            <div className="relative min-h-[30px]">
              <div className="flex justify-center items-center">
                <pre className="text-black dark:text-white font-mono text-sm mt-2">
                  <code>{installCommands[selectedCommand]}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
