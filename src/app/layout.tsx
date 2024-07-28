import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import NavBar from "@/components/common/NavBar/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coworkers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
