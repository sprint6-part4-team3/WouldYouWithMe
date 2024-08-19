import { ReactNode } from "react";

import { SidePage } from "@/components/common";

export const metadata = {
  title: "할 일 추가",
};

const Layout = ({ children }: { children: ReactNode }) => (
  <SidePage>
    <h1 className="mt-16 text-18-500 md:text-20-700">할 일 추가</h1>
    {children}
  </SidePage>
);

export default Layout;
