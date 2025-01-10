"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 w-full z-50 backdrop-blur-lg shadow-md bg-white/30 text-black dark:bg-black/30 dark:text-white"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Copyright and Name */}
        <div className="flex items-center gap-2 text-sm font-light">
          <span className="text-gray-700 dark:text-gray-300">
            © {new Date().getFullYear()} Jupiverse Kit
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-4">
          <Link
            href="https://github.com/dannweeeee/jupiverse-kit"
            className="hover:text-gray-500 transition-colors text-sm font-light text-black dark:text-white flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-5 h-5" style={{ fill: "url(#gradient)", stroke: "url(#gradient)" }} />
            <svg width="0" height="0">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#A4D756", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#00B6E7", stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </svg>
          </Link>
          <Link
            href="https://jup.ag"
            className="hover:text-gray-500 transition-colors text-sm font-light text-black dark:text-white flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/logo/logo-bright.svg"
              alt="Jup.ag"
              width={22}
              height={22}
              className="dark:hidden"
            />
            <Image
              src="/logo/logo-dark.svg"
              alt="Jup.ag"
              width={22}
              height={22}
              className="hidden dark:block"
            />
          </Link>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
