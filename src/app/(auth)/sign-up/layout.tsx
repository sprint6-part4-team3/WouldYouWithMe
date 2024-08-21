import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "회원 가입",
  description: "회원 가입 페이지",
  openGraph: {
    title: "우주윗미 - 회원 가입",
    url: "https://3team-coworkers.netlify.app/sign-up",
  },
  twitter: {
    title: "우주윗미 - 회원 가입",
  },
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
