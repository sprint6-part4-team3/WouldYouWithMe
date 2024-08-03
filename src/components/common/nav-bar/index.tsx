"use server";

import Link from "next/link";

import { User } from "@/types/user";

import { Logo, TeamDropdown, UserDropdown } from "./nav-component";

interface NavBarProps {
  user: User | null;
}

const NavBar = ({ user }: NavBarProps) => {
  const firstTeamName = user?.memberships.length
    ? user.memberships[0].group.name
    : null;

  const renderContent = () => {
    if (user) {
      return (
        <>
          <div className="flex items-center gap-20">
            <Logo />
            <div className="hidden items-center gap-20 md:flex">
              {firstTeamName && <TeamDropdown teamName={firstTeamName} />}
              <Link href="/">자유게시판</Link>
            </div>
          </div>
          <UserDropdown userNickname={user.nickname} />
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
