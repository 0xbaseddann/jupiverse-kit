"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/constants";
import Link from "next/link";
import { Menu, WalletIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { itemVariants, navVariants } from "@/utils/motion";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme } = useTheme();

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="fixed w-full top-0 z-50 backdrop-blur-lg shadow-lg 
        bg-white/70 text-black dark:bg-black/70 dark:text-white"
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between ">
        {/* Logo */}
        <motion.div variants={itemVariants} className="flex-1">
          <Link
            href="/"
            className="text-2xl font-extrabold flex items-center gap-2"
          >
            <Image
              src="/logo/cat.svg"
              alt="Jupiverse Kit"
              width={35}
              height={35}
              className="filter dark:invert"
            />
            <span className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
              Jupiverse Kit
            </span>
          </Link>
        </motion.div>

        {/* Navigation Items - Desktop */}
        <motion.div
          variants={itemVariants}
          className="hidden md:flex flex-1 justify-center gap-10"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-gray-500 transition-colors text-lg font-medium text-black dark:text-white"
            >
              {item.name}
            </Link>
          ))}
        </motion.div>

        {/* Connect Wallet Button and Theme Toggle - Desktop */}
        <motion.div
          variants={itemVariants}
          className="hidden md:flex flex-1 justify-end items-center gap-4"
        >
          <UnifiedWalletButton
            buttonClassName="font-sans font-semibold rounded-3xl px-4 py-3 text-sm flex justify-center items-center text-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-white dark:text-white cursor-pointer"
            currentUserClassName="font-sans font-semibold min-w-[90px] min-h-[50px] rounded-full px-5 py-3 text-sm flex justify-center items-center text-center gap-2 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-white dark:text-white cursor-pointer"
            overrideContent={
              <>
                <WalletIcon className="h-4 w-4 opacity-70" />
                Connect Wallet
              </>
            }
          />
          <ThemeToggle />
        </motion.div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/20 text-black dark:text-white"
              >
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-l border-gray-300 bg-white/80 dark:border-gray-700 backdrop-blur-lg [&>button]:flex [&>button]:items-center [&>button]:justify-center"
            >
              <SheetHeader className="border-b pb-4 border-gray-300 darl:border-gray-700">
                <SheetTitle className="flex items-center gap-3">
                  <Image
                    src="/logo/cat.svg"
                    alt="Jupiverse Kit"
                    width={28}
                    height={28}
                    className="invert brightness-0 filter-none"
                  />
                  Jupiverse Kit
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-8 mt-10">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-xl transition-colors flex items-center gap-3 text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-6 border-t w-full flex justify-center border-gray-300 dark:border-gray-700">
                  <UnifiedWalletButton />
                </div>
              </div>
              <div className="absolute bottom-6 right-6">
                <ThemeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
