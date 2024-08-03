import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const TeamManagementLayout = ({ children }: LayoutProps) => (
  <div className="mb-100 flex flex-col items-center justify-center">
    <div className="mt-72 flex w-full max-w-460 flex-col items-center justify-center md:mt-100 lg:mt-140 ">
      {children}
    </div>
  </div>
);

export default TeamManagementLayout;
