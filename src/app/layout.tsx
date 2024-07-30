import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ToastContainer from "@/components/common/toast/container";

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
    <html lang="ko" className="dark">
      <body
        className={`${inter.className} dark:bg-background-primary dark:text-text-primary`}
      >
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
