"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full z-0 backdrop-blur-lg shadow-md bg-transparent text-black dark:text-white pb-3 mt-auto fixed bottom-0 left-0 right-0"
    >
      <div className="container mx-auto px-4 h-16 flex flex-col items-center justify-center">
        {/* Navigation Links */}
        <div className="flex gap-4 mb-2">
          <Link
            href="https://x.com/jupiversekit"
            className="hover:text-gray-500 transition-transform transform hover:scale-110 text-sm font-light text-black dark:text-white flex items-center cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter
              className="w-5 h-5"
              style={{ fill: "url(#gradient)", stroke: "url(#gradient)" }}
            />
            <svg width="0" height="0">
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
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
          <Link
            href="https://github.com/dannweeeee/jupiverse-kit"
            className="hover:text-gray-500 transition-transform transform hover:scale-110 text-sm font-light text-black dark:text-white flex items-center cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github
              className="w-5 h-5"
              style={{ fill: "url(#gradient)", stroke: "url(#gradient)" }}
            />
            <svg width="0" height="0">
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
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
          <Link
            href="https://www.npmjs.com/package/jupiverse-kit"
            className="hover:text-gray-500 transition-transform transform hover:scale-110 text-sm font-light text-black dark:text-white flex items-center cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-5 h-5"
              style={{ fill: "url(#gradient)", stroke: "url(#gradient)" }}
            >
              <path d="m0 0h24v24h-24z" fill="none" opacity="0"/>
              <path d="m18 3h-12a3 3 0 0 0 -3 3v12a3 3 0 0 0 3 3h7v-10h4v10h1a3 3 0 0 0 3-3v-12a3 3 0 0 0 -3-3z"/>
            </svg>
            <svg width="0" height="0">
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
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
          <Link
            href="https://jup.ag"
            className="hover:text-gray-500 transition-transform transform hover:scale-110 text-sm font-light text-black dark:text-white flex items-center cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/jupiter/logo-bright.svg"
              alt="Jup.ag"
              width={22}
              height={22}
              className="dark:hidden"
            />
            <Image
              src="/jupiter/logo-dark.svg"
              alt="Jup.ag"
              width={22}
              height={22}
              className="hidden dark:block"
            />
          </Link>
        </div>

        {/* Copyright and Name */}
        <div className="flex items-center gap-2 text-sm font-light">
          <span className="text-gray-700 dark:text-gray-300">
            © {new Date().getFullYear()} Jupiverse Kit
          </span>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
