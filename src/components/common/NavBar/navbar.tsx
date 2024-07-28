"use client";

import clsx from "clsx";
import Image from "next/image";

import { IconDropdown, IconUser } from "@/public/assets/icons";
import LogoImage from "@/public/assets/images/logo-coworkers.png";

const user = {
  id: 43,
  nickname: "test",
};

const groups = {
  id: 43,
  name: "테스트팀",
};

const NavBar = () => (
  <header className="sticky top-0 z-10 h-60 border-b border-border-primary bg-background-secondary">
    <div className="mx-16 flex h-full items-center justify-between lg:mx-200 xl:mx-360">
      {user ? (
        <>
          <div className="flex items-center whitespace-nowrap text-lg-medium text-text-primary">
            <div className="mr-12 size-32 rounded-md bg-brand-primary" />
            {groups.name}
            <IconDropdown className="ml-12" />
          </div>
          <div className="flex items-center justify-center whitespace-nowrap text-md-medium text-text-primary">
            <IconUser className="mr-12" />
            <span className={clsx("hidden", "xl:inline")}>{user.nickname}</span>
          </div>
        </>
      ) : (
        <>
          <div className="relative w-102 shrink-0 xl:w-158">
            <Image
              src={LogoImage}
              alt="코워커스 로고"
              className="object-fill"
            />
          </div>
          <span className="whitespace-nowrap text-text-primary">로그인</span>
        </>
      )}
    </div>
  </header>
);

export default NavBar;
