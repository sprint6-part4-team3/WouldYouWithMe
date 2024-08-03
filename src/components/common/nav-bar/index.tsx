"use server";

import Link from "next/link";

import { User } from "@/types/user";

import Logo from "./logo";
import TeamDropdown from "./team-dropdown";
import UserDropdown from "./user-dropdown";

interface NavBarProps {
  user: User | null;
}

const NavBar = ({ user }: NavBarProps) => {
  const renderContent = () => {
    if (user) {
      const hasMemberships = user.memberships.length > 0;

      return (
        <>
          <div className="flex items-center gap-20">
            <Logo user={user} />
            <div className="hidden items-center gap-20 md:flex">
              {hasMemberships && <TeamDropdown user={user} />}
              <Link href="/" className="text-text-primary">
                자유게시판
              </Link>
            </div>
          </div>
          <UserDropdown user={user} />
        </>
      );
    }

    return <Logo user={user} />;
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
