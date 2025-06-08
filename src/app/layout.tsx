import Navbar from "@/components/organisms/Navbar";
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import type { Metadata } from "next";
import "../styles/globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "OxMaster | Vocabularies",
  description: "Master English vocabulary with OxMaster - Learn smarter, remember longer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
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
            <footer className="bg-bg-footer text-white py-8 mt-auto">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">OxMaster</h3>
                    <p className="text-sm text-gray-300">
                      Master English vocabulary with our innovative learning platform.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Home</a></li>
                      <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Vocabulary Lists</a></li>
                      <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Practice</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Contact</h3>
                    <ul className="space-y-2">
                      <li className="text-sm text-gray-300">Email: support@oxmaster.com</li>
                      <li className="text-sm text-gray-300">Follow us on social media</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-300">
                  © {new Date().getFullYear()} OxMaster. All rights reserved.
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
