import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import AppProvider from "@/components/app-provider";
import ToastContainer from "@/components/common/toast/container";
import NavBar from "@/components/nav-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coworkers",
};

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => (
  <html lang="ko" className="dark">
    <body
      className={`${inter.className} min-w-330 dark:bg-background-primary dark:text-text-primary`}
    >
      <AppProvider>
        <ToastContainer />
        <NavBar />
        <div className="fixed inset-0 -z-10 bg-[url('/assets/images/img-background.png')] bg-cover bg-center bg-repeat opacity-20" />
        <main className="px-16 ">{children}</main>
      </AppProvider>
    </body>
  </html>
);

export default RootLayout;
