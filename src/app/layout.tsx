import Navbar from "@/components/organisms/Navbar";
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import type { Metadata } from "next";
import "../styles/globals.css";
import Footer from "@/components/organisms/Footer";
import { SessionProvider } from 'next-auth/react';
import { headers } from 'next/headers';
import { auth } from './services/auth.service';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "OxMaster | Vocabularies",
  description: "Master English vocabulary with OxMaster - Learn smarter, remember longer",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {/* Background Decorations */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
              <div className="absolute -top-[40%] -right-[40%] w-[80%] h-[80%] rounded-full bg-primary/5 blur-3xl" />
              <div className="absolute -bottom-[40%] -left-[40%] w-[80%] h-[80%] rounded-full bg-secondary/5 blur-3xl" />
            </div>

            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow container mx-auto px-4 py-8">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
