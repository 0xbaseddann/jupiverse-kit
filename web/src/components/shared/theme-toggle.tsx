"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="default"
      size="lg"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="bg-white dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-black dark:text-white p-5 rounded-full"
    >
      <Sun className="h-20 w-20 transition-transform duration-300 dark:-rotate-90 dark:scale-0 text-black" />
      <Moon className="absolute h-20 w-20 transition-transform duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100 text-white" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
