import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <main className="mx-auto flex max-w-1200 flex-col gap-48">{children}</main>
);

export default Layout;
