import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "회원 가입 | 우주윗미",
  description: "회원 가입 페이지",
};

interface SignUpLayoutProps {
  children: React.ReactNode;
}

const SignUpLayout = ({ children }: SignUpLayoutProps) => (
  <div className="mb-100 flex flex-col items-center justify-center">
    {children}
  </div>
);

export default SignUpLayout;
