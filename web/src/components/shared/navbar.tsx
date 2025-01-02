"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/constants";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { itemVariants, navVariants } from "@/utils/motion";
import { WalletConnectButton } from "@/components/wallet/WalletConnectButton";
import Image from "next/image";

const Navbar = () => {
  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="fixed w-full top-0 z-50 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div variants={itemVariants} className="flex-1">
          <Link
            href="/"
            className="text-xl font-bold text-white flex items-center gap-1"
          >
            <Image
              src="/logo/cat.svg"
              alt="Jupiverse Kit"
              width={30}
              height={30}
              className="invert brightness-0"
            />
            Jupiverse Kit
          </Link>
        </motion.div>

        {/* Navigation Items - Desktop */}
        <motion.div
          variants={itemVariants}
          className="hidden md:flex flex-1 justify-center gap-8"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-gray-400 transition-colors text-md text-white"
            >
              {item.name}
            </Link>
          ))}
        </motion.div>

        {/* Connect Wallet Button - Desktop */}
        <motion.div
          variants={itemVariants}
          className="hidden md:flex flex-1 justify-end"
        >
          <WalletConnectButton />
        </motion.div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-l border-gray-800 bg-black/95 backdrop-blur-md [&>button]:text-white [&>button]:flex [&>button]:items-center [&>button]:justify-center"
            >
              <SheetHeader className="border-b border-gray-800 pb-4">
                <SheetTitle className="text-white flex items-center gap-2">
                  <Image
                    src="/logo/cat.svg"
                    alt="Jupiverse Kit"
                    width={24}
                    height={24}
                    className="invert brightness-0"
                  />
                  Jupiverse Kit
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-800 w-full flex justify-center">
                  <WalletConnectButton />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
