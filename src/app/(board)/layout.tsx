import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const BoardLayout = ({ children }: LayoutProps) => (
  <div className="mx-auto flex max-w-1200 flex-col">{children}</div>
);

export default BoardLayout;
