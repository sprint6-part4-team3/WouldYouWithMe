import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "로그인",
  description: "로그인 페이지",
};

interface SignInLayoutProps {
  children: React.ReactNode;
}

const SignInLayout = ({ children }: SignInLayoutProps) => (
  <div className="mb-100 flex flex-col items-center justify-center">
    {children}
  </div>
);

export default SignInLayout;
