import { Metadata } from "next";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "팀 관리 | 팀 생성 및 참여",
  description:
    "새로운 팀을 생성하거나 기존 팀에 참여하세요. 효율적인 팀 관리를 시작합니다.",
};

const TeamManagementLayout = ({ children }: LayoutProps) => (
  <div className="mb-100 flex flex-col items-center justify-center">
    <div className="mt-72 flex w-full max-w-460 flex-col items-center justify-center md:mt-100 lg:mt-140 ">
      {children}
    </div>
  </div>
);

export default TeamManagementLayout;
