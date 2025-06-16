'use client';

import { Inter } from "next/font/google";
import "@/styles/globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import SessionProvider from '@/components/providers/SessionProvider';
import { Toaster } from "sonner";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import { SessionExpiredProvider } from "@/contexts/SessionExpiredContext";
import SessionExpiredModal from "@/components/atoms/SessionExpiredModal";
import TokenExpiryHandler from '@/components/atoms/TokenExpiryHandler';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <SessionProvider>
          <TokenExpiryHandler />
          <ThemeProvider>
            <SessionExpiredProvider>
              <SessionExpiredModal />
              {/* Background Decorations */}
              <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-[40%] -right-[40%] w-[80%] h-[80%] rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -bottom-[40%] -left-[40%] w-[80%] h-[80%] rounded-full bg-secondary/5 blur-3xl" />
              </div>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster />
            </SessionExpiredProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
