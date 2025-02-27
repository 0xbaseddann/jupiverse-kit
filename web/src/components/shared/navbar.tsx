"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center p-4 mx-6"
    >
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex items-center gap-3"
      >
        <Link href="/">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Image
              src="/logo/jup-kit-logo-2-no-bg.png"
              alt="Jupiverse Logo"
              width={36}
              height={36}
              className="rounded-xl"
            />
          </motion.div>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="https://www.npmjs.com/package/jupiverse-kit"
          className="hover:text-gray-500 text-sm font-light text-black dark:text-white flex items-center cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width="20"
            height="10"
            viewBox="0 0 256 100"
            className="w-12 h-12 cursor-pointer"
            style={{ fill: "url(#gradient)", stroke: "url(#gradient)" }}
          >
            <path d="M0 0v85.498h71.166V99.83H128V85.498h128V0H0z" />
            <path
              d="M42.502 14.332h-28.17v56.834h28.17V28.664h14.332v42.502h14.332V14.332H42.502zM85.498 14.332v71.166h28.664V71.166h28.17V14.332H85.498zM128 56.834h-13.838v-28.17H128v28.17zM184.834 14.332h-28.17v56.834h28.17V28.664h14.332v42.502h14.332V28.664h14.332v42.502h14.332V14.332h-57.328z"
              fill="#FFF"
            />
          </svg>
          <svg width="0" height="0">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#A4D756", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#00B6E7", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
          </svg>
        </Link>
      </motion.div>

      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <ThemeToggle />
      </motion.div>
    </motion.div>
  );
}
