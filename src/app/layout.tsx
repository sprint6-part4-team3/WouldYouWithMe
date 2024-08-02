import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { NavBar } from "@/components/common";
import ToastContainer from "@/components/common/toast/container";

const inter = Inter({ subsets: ["latin"] });

const user = {
  id: 123,
  email: "test1@test1.com",
  nickname: "테스트용",
};

const team = {
  id: 132,
  name: "경영관리팀",
};

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
