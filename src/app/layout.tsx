import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ToastContainer from "@/components/common/toast/container";
import NavBar from "@/components/nav-bar";
import ReactQueryProvider from "@/components/react-query-provider";

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
      <ReactQueryProvider>
        <ToastContainer />
        <NavBar />
        <main>{children}</main>
      </ReactQueryProvider>
    </body>
  </html>
);

export default RootLayout;
