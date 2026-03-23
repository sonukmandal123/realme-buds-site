import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Realme Buds | Pure Sound",
  description: "Cinematic product narrative for Realme flagship earbuds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth no-scrollbar">
      <body className={`${inter.className} antialiased selection:bg-white/20`}>
        {children}
      </body>
    </html>
  );
}
