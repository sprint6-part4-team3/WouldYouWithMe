import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "마이히스토리",
  description: "내 지원정보페이지",
};

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="mx-auto flex flex-col">{children}</div>
);

export default Layout;
