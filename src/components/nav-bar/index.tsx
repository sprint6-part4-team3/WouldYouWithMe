"use server";

import { cookies } from "next/headers";
import Link from "next/link";

import Logo from "./logo";
import TeamDropdown from "./team-dropdown";
import UserDropdown from "./user-dropdown";

const NavBar = () => {
  const userNickname = cookies().get("userNickname");

  const renderContent = () => {
    if (userNickname) {
      return (
        <>
          <div className="flex items-center gap-20">
            <Logo />
            <div className="hidden items-center gap-20 md:flex">
              <TeamDropdown />
              <Link href="/board" className="text-text-primary">
                자유게시판
              </Link>
            </div>
          </div>
          <UserDropdown />
        </>
      );
    }

    return <Logo />;
  };

  return (
    <header className="sticky top-0 z-10 h-60 border-b border-border-secondary bg-background-secondary">
      <div className="mx-24 flex h-full items-center justify-between lg:mx-120">
        {renderContent()}
      </div>
    </header>
  );
};

export default NavBar;
