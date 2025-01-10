"use client";

import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useTheme } from "next-themes";

const Hero = () => {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  console.log("HERO THEME", theme);

  const installCommands = {
    npm: "npm i jupiverse-kit",
    pnpm: "pnpm i jupiverse-kit",
    yarn: "yarn add jupiverse-kit",
    bun: "bun add jupiverse-kit",
  };

  const handleCopy = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 sm:px-6">
      <div className="container mx-auto flex flex-col items-center text-center justify-center text-primary py-12 sm:py-20 md:py-28">
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
          <Highlight className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text rounded-xl">
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
          className="text-center mt-8 sm:mt-12 text-lg sm:text-xl md:text-2xl lg:text-[24px] md:max-w-prose mx-auto font-medium text-muted-foreground dark:text-cloud px-6 sm:px-0"
        >
          The ultimate ready-to-use React components library
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
            className="sm:w-[220px] sm:h-[44px] dark:hidden"
          />
          <Image
            src="/jupiter/poweredbyjupiter-dark.svg"
            alt="Powered by Jupiter"
            width={180}
            height={36}
            className="sm:w-[220px] sm:h-[44px] hidden dark:block"
          />
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
            delay: 0.6,
          }}
          className="mt-10 sm:mt-16 flex flex-col items-center justify-center w-full"
        >
          <div className="relative w-full max-w-[650px] mx-auto bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-300 dark:border-gray-700">
            <Tabs defaultValue="npm" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger
                  value="npm"
                  className="text-xs sm:text-sm text-gray-800 dark:text-black data-[state=active]:bg-trifid dark:data-[state=active]:bg-trifid"
                >
                  npm
                </TabsTrigger>
                <TabsTrigger
                  value="pnpm"
                  className="text-xs sm:text-sm text-gray-800 dark:text-black data-[state=active]:bg-trifid dark:data-[state=active]:bg-trifid"
                >
                  pnpm
                </TabsTrigger>
                <TabsTrigger
                  value="yarn"
                  className="text-xs sm:text-sm text-gray-800 dark:text-black data-[state=active]:bg-trifid dark:data-[state=active]:bg-trifid"
                >
                  yarn
                </TabsTrigger>
                <TabsTrigger
                  value="bun"
                  className="text-xs sm:text-sm text-gray-800 dark:text-black data-[state=active]:bg-trifid dark:data-[state=active]:bg-trifid"
                >
                  bun
                </TabsTrigger>
              </TabsList>
              {Object.entries(installCommands).map(([pkg, command]) => (
                <TabsContent key={pkg} value={pkg} className="relative">
                  <pre className="text-emerald-600 dark:text-emerald-400 font-mono text-md sm:text-xl overflow-x-auto">
                    <code>{command}</code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(command)}
                    className="absolute top-0 right-0 text-gray-600 dark:text-gray-400 flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
                  >
                    {copied ? (
                      <>
                        <Check size={16} className="sm:w-5 sm:h-5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} className="sm:w-5 sm:h-5" />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
