"use server";

import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import LogoImage from "@/public/assets/images/logo-coworkers.png";

import GnbButton from "./gnb-button";
import TeamDropdown from "./team-dropdown";
import UserDropdown from "./user-dropdown";

const NavBar = () => {
  const userIdCookie = cookies().get("userId");
  const userId = userIdCookie ? userIdCookie.value : "";

  return (
    <header className="sticky top-0 z-10 h-60 border-b border-border-secondary bg-background-secondary">
      <div className="mx-24 flex h-full items-center justify-between lg:mx-120">
        <div className="flex items-center gap-20">
          {userId && <GnbButton />}
          <div className="relative w-158 shrink-0">
            <Link href="/">
              <Image
                src={LogoImage}
                alt="코워커스 로고"
                className="object-fill"
              />
            </Link>
          </div>
          {userId && (
            <div className="hidden items-center gap-20 md:flex">
              <TeamDropdown />
            </div>
          )}
          <Link href="/boards" className="text-text-primary">
            자유게시판
          </Link>
        </div>
        {userId && <UserDropdown />}
      </div>
    </header>
  );
};

export default NavBar;
