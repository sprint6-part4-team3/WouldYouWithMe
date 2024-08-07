import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "계정 설정",
  description: "계정 설정 페이지",
};

interface UserSettingLayoutProps {
  children: React.ReactNode;
}

const UserSettingLayout = ({ children }: UserSettingLayoutProps) => (
  <div className="mb-100 flex flex-col items-center justify-center">
    {children}
  </div>
);

export default UserSettingLayout;
