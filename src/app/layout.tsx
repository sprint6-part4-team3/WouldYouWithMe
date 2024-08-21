import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import AppProvider from "@/components/app-provider";
import ToastContainer from "@/components/common/toast/container";
import StarsCanvas from "@/components/landing/star-canvas";
import NavBar from "@/components/nav-bar";
import GoogleAnalytics from "@/lib/google-analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "우주윗미 | 같이 스터디해요",
  description: "우주윗미는 같이 스터디할 사람을 찾아주는 서비스입니다.",
  icons: {
    icon: "/assets/favicon.ico",
  },
  openGraph: {
    title: "우주윗미 - WYWM",
    description: "Would You Study With Me? 우주윗미",
    url: "https://3team-coworkers.netlify.app",
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
    title: "우주윗미 - WYWM",
    description: "Would You Study With Me? 우주윗미",
    creator: "6-3",
    images: [
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/85/img-og.png",
    ],
  },
};

const RootLayout: React.FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}) => (
  <html lang="ko" className="dark">
    <body
      className={`${inter.className} min-w-330 dark:bg-background-primary dark:text-text-primary`}
    >
      <StarsCanvas />
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      ) : null}
      <AppProvider>
        <ToastContainer />
        <NavBar />
        <div className="fixed inset-0 -z-10 bg-cover bg-center bg-repeat opacity-20" />
        <main className="px-16 ">{children}</main>
      </AppProvider>
    </body>
  </html>
);

export default RootLayout;
