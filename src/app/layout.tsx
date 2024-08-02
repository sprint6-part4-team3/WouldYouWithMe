import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { NavBar } from "@/components/common";
import ToastContainer from "@/components/common/toast/container";

const inter = Inter({ subsets: ["latin"] });

const user = {
  id: 44,
  email: "test1@test1.com",
  nickname: "두꺼비",
  image: null,
  teamId: "6-3",
  memberships: [
    {
      userId: 44,
      groupId: 30,
      userName: "두꺼비",
      userEmail: "test1@test1.com",
      userImage: null,
      role: "ADMIN",
      group: {
        id: 30,
        teamId: null,
        name: "테스트1팀",
        image: "https://example.com/...",
        createdAt: "2024-08-02T09:12:09.418Z",
        updatedAt: "2024-08-02T09:12:09.418Z",
      },
    },
    {
      userId: 44,
      groupId: 31,
      userName: "두꺼비",
      userEmail: "test1@test1.com",
      userImage: null,
      role: "ADMIN",
      group: {
        id: 31,
        teamId: null,
        name: "테스트2팀",
        image: "https://example.com/...",
        createdAt: "2024-08-02T09:13:02.456Z",
        updatedAt: "2024-08-02T09:13:02.456Z",
      },
    },
    {
      userId: 44,
      groupId: 32,
      userName: "두꺼비",
      userEmail: "test1@test1.com",
      userImage: null,
      role: "ADMIN",
      group: {
        id: 32,
        teamId: null,
        name: "테스트3팀",
        image: "https://example.com/...",
        createdAt: "2024-08-02T09:18:09.418Z",
        updatedAt: "2024-08-02T09:18:09.418Z",
      },
    },
  ],
};

const team = {
  id: user.memberships[0].group.id,
  name: user.memberships[0].group.name,
};

export const metadata: Metadata = {
  title: "Coworkers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body
        className={`${inter.className} dark:bg-background-primary dark:text-text-primary`}
      >
        <ToastContainer />
        <NavBar user={user} team={team} />
        <main className="mx-16">{children}</main>
      </body>
    </html>
  );
}
