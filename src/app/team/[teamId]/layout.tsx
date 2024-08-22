import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="mx-auto mb-50 mt-25 flex max-w-1200 flex-col gap-48">
    {children}
  </div>
);

export default Layout;
