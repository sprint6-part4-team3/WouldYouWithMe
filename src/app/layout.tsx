import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { NavBar } from "@/components/common";
import ToastContainer from "@/components/common/toast/container";

import LoginUserTestData from "./user.json";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coworkers",
};

const user = LoginUserTestData;

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => (
  <html lang="ko" className="dark">
    <body
      className={`${inter.className} min-w-330 dark:bg-background-primary dark:text-text-primary`}
    >
      <ToastContainer />
      <NavBar user={user} />
      <main className="mx-16">{children}</main>
    </body>
  </html>
);

export default RootLayout;
