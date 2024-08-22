import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "로그인 | 우주윗미",
  description: "로그인 페이지",
  openGraph: {
    title: "우주윗미 - 로그인",
    description: "Would You Study With Me? 우주윗미",
    url: "https://3team-coworkers.netlify.app/login",
    siteName: "우주윗미",
    images: [
      {
        url: "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/85/img-og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "우주윗미 - 로그인",
    description: "Would You Study With Me? 우주윗미",
    creator: "6-3",
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/85/img-og.png",
    ],
  },
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
