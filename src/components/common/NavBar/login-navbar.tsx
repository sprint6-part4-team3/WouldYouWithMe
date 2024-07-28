"use client";

import clsx from "clsx";

import { IconDropdown, IconUser } from "@/public/assets/icons";

const LoginNavBar = () => (
  <header className="sticky top-0 z-10 h-60 border-b border-border-primary bg-background-secondary">
    <div className="mx-16 flex h-full items-center justify-between lg:mx-200 xl:mx-360">
      <div className="flex items-center whitespace-nowrap text-lg-medium text-text-primary">
        <div className="mr-12 size-32 rounded-md bg-brand-primary" />
        경영관리팀
        <IconDropdown className="ml-12" />
      </div>
      <div className="flex items-center justify-center whitespace-nowrap text-md-medium text-text-primary">
        <IconUser className="mr-12" />
        <span className={clsx("hidden", "lg:inline")}>안해나</span>
      </div>
    </div>
  </header>
);

export default LoginNavBar;
