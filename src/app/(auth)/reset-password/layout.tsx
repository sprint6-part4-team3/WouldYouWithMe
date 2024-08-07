import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "비밀번호 재설정",
  description: "비밀번호 재설정 페이지",
};

interface ResetPasswordLayoutProps {
  children: React.ReactNode;
}

const ResetPasswordLayout = ({ children }: ResetPasswordLayoutProps) => (
  <div className="mb-100 flex flex-col items-center justify-center">
    {children}
  </div>
);

export default ResetPasswordLayout;
