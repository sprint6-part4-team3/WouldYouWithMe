import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "경영지원팀",
  description: "경영지원팀 팀페이지입니다.",
};

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="mx-auto mb-50 mt-25 flex max-w-1200 flex-col gap-48">
    {children}
  </div>
);

export default Layout;
