import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import "./globals.css";
import "jupiverse-kit/dist/index.css";

import Navbar from "@/components/shared/navbar";
import NProgressBar from "@/components/ui/nprogressbar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { WalletProvider } from "@/components/providers/wallet-provider";

import { Toaster } from "sonner";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Footer from "@/components/shared/footer";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jupiverse Kit",
  description:
    "Jupiverse Kit is the ultimate ready-to-use React components library powered by Jupiter's APIs for building onchain applications on Solana effortlessly.",
  openGraph: {
    title: "Jupiverse Kit",
    description:
      "Ready-to-use React components library powered by Jupiter's APIs",
    images: [
      {
        url: "https://github.com/dannweeeee/jupiverse-kit/blob/main/web/public/banner/jupiverse-kit-banner-dark.png?raw=true",
        width: 1200,
        height: 630,
        alt: "Jupiverse Kit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jupiverse Kit",
    description:
      "Ready-to-use React components library powered by Jupiter's APIs",
    images: [
      {
        url: "https://github.com/dannweeeee/jupiverse-kit/blob/main/web/public/banner/jupiverse-kit-banner-dark.png?raw=true",
        alt: "Jupiverse Kit",
      },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          storageKey="theme"
          disableTransitionOnChange
        >
          <WalletProvider>
            <NProgressBar>
              <main className="min-h-screen">
                <AuroraBackground>
                  <Navbar />
                  {children}
                  <Footer />
                </AuroraBackground>
                <Toaster position="bottom-left" />
              </main>
            </NProgressBar>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
