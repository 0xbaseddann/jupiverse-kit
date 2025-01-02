"use client";

import { Button } from "@/components/ui/button";
import { Highlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

const Hero = () => {
  const [copied, setCopied] = useState(false);

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
      <div className="container mx-auto flex flex-col items-center text-center justify-center text-primary py-8 sm:py-16 md:py-24">
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
            duration: 0.4,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl text-center !leading-tight"
        >
          <Highlight className="text-black dark:text-white rounded-xl">
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
            duration: 0.4,
            ease: [0.4, 0.0, 0.2, 1],
            delay: 0.2,
          }}
          className="text-center mt-6 sm:mt-10 text-base sm:text-lg md:text-xl lg:text-[22px] md:max-w-prose mx-auto font-medium relative bg-contrast text-white px-4 sm:px-0"
        >
          Ultimate ready-to-use React components library
          <br className="hidden sm:block" />
          for building onchain applications on Solana effortlessly.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0.0, 0.2, 1],
            delay: 0.4,
          }}
          className="mt-4"
        >
          <Image
            src="/jupiter/poweredbyjupiter-dark.svg"
            alt="Powered by Jupiter"
            width={150}
            height={30}
            className="sm:w-[200px] sm:h-[40px]"
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
            duration: 0.3,
            ease: [0.4, 0.0, 0.2, 1],
            delay: 0.6,
          }}
          className="mt-8 sm:mt-12 flex flex-col items-center justify-center w-full"
        >
          <div className="relative w-full max-w-[600px] mx-auto bg-gradient-to-r from-gray-900 to-black rounded-xl p-4 sm:p-6 shadow-xl border border-gray-800">
            <Tabs defaultValue="npm" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="npm" className="text-sm sm:text-base">
                  npm
                </TabsTrigger>
                <TabsTrigger value="pnpm" className="text-sm sm:text-base">
                  pnpm
                </TabsTrigger>
                <TabsTrigger value="yarn" className="text-sm sm:text-base">
                  yarn
                </TabsTrigger>
                <TabsTrigger value="bun" className="text-sm sm:text-base">
                  bun
                </TabsTrigger>
              </TabsList>
              {Object.entries(installCommands).map(([pkg, command]) => (
                <TabsContent key={pkg} value={pkg} className="relative">
                  <pre className="text-emerald-400 font-mono text-sm sm:text-lg overflow-x-auto">
                    <code>{command}</code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(command)}
                    className="absolute top-0 right-0 text-gray-300 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="sm:w-4 sm:h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} className="sm:w-4 sm:h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>
                </TabsContent>
              ))}
            </Tabs>
          </div>
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
            duration: 0.4,
            ease: [0.4, 0.0, 0.2, 1],
            delay: 0.8,
          }}
          className="mt-8 sm:mt-12 flex gap-4 flex-wrap justify-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="text-base sm:text-lg"
            onClick={() => window.open("https://jup.ag", "_blank")}
          >
            Get Started
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
