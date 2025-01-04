import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar";
import { WalletProvider } from "jupiverse-kit";
import { Toaster } from "jupiverse-kit";
import NProgressBar from "@/components/ui/nprogressbar";
import { UniverseBackground } from "@/components/ui/universe-background";
import "jupiverse-kit/dist/index.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jupiverse Kit",
  description:
    "Jupiverse Kit is the ultimate ready-to-use React components library powered by Jupiter's APIs for building onchain applications on Solana effortlessly.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
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
          disableTransitionOnChange
        >
          <WalletProvider rpcUrl={process.env.NEXT_PUBLIC_RPC_URL}>
            <UniverseBackground />
            <NProgressBar>
              <main className="min-h-screen">
                <Navbar />
                {children}
                <Toaster />
              </main>
            </NProgressBar>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
