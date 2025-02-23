"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/constants";
import Link from "next/link";
import { Github, Menu, Twitter, WalletIcon } from "lucide-react";
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

const Navbar = () => {
  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="fixed w-full top-0 z-0 backdrop-blur-lg shadow-lg 
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
              src="/logo/space-cat-logo-circle.png"
              alt="Jupiverse Kit"
              width={35}
              height={35}
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
              className="hover:text-gray-500 transition-colors text-sm font-medium text-black dark:text-white whitespace-nowrap cursor-pointer"
            >
              {item.name}
            </Link>
          ))}
        </motion.div>

        {/* Theme Toggle - Desktop */}
        <motion.div
          variants={itemVariants}
          className="hidden md:flex flex-1 justify-end items-center gap-4"
        >
          <ThemeToggle />
        </motion.div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-200 dark:hover:bg-gray-600 text-black dark:text-white"
              >
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="border-l border-gray-300 bg-white dark:bg-black dark:border-gray-700 backdrop-blur-lg [&>button]:flex [&>button]:items-center [&>button]:justify-center z-[9999]"
            >
              <SheetHeader className="border-b pb-4 border-gray-300 dark:border-gray-700">
                <SheetTitle className="flex items-center gap-3">
                  <Image
                    src="/logo/space-cat-logo-circle.png"
                    alt="Jupiverse Kit"
                    width={28}
                    height={28}
                    className="filter"
                  />
                  <span className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                    Jupiverse Kit
                  </span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-8 mt-10">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-xl transition-colors flex items-center gap-3 text-black hover:text-gray-500 dark:text-white dark:hover:text-gray-300 whitespace-nowrap cursor-pointer"
                  >
                    {item.name}
                  </Link>
                ))}
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
