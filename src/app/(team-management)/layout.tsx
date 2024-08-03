import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const TeamManagementLayout = ({ children }: LayoutProps) => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="flex w-full max-w-460 flex-col items-center">
      {children}
    </div>
  </div>
);

export default TeamManagementLayout;
