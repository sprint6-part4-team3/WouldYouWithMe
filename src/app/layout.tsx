import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { NavBar } from "@/components/common";
import ToastContainer from "@/components/common/toast/container";

const inter = Inter({ subsets: ["latin"] });

const user = null;

const team = null;

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
        <NavBar user={user} team={team} />
        <main className="mx-16">{children}</main>
      </body>
    </html>
  );
}
