import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "할 일 목록",
  description: "할 일 목록을 확인하고 관리합니다.",
};

const Layout = ({
  children,
  side,
}: Readonly<{
  children: React.ReactNode;
  side: React.ReactNode;
}>) => (
  <div className="mx-auto mt-24 w-full max-w-1200 pb-70">
    {children}
    {side}
  </div>
);

export default Layout;
