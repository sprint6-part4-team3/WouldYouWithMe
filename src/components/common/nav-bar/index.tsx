"use server";

import Link from "next/link";

import { Logo, TeamDropdown, UserDropdown } from "./nav-component";

// TODO - 임시로 넣었습니다. api 작업 후 수정할 예정입니다.
interface User {
  id: number;
  email: string;
  nickname: string;
}

interface Team {
  id: number;
  name: string;
}

interface NavBarProps {
  user: User | null;
  team: Team | null;
}

const NavBar = ({ user, team }: NavBarProps) => {
  const renderContent = () => {
    if (user && team) {
      return (
        <>
          <div className="flex items-center gap-20">
            <Logo />
            <TeamDropdown teamName={team.name} />
            <Link href="/">자유게시판</Link>
          </div>
          <UserDropdown userNickname={user.nickname} />
        </>
      );
    }

    if (user) {
      return (
        <>
          <div className="flex items-center gap-20">
            <Logo />
            <Link href="/">자유게시판</Link>
          </div>
          <UserDropdown userNickname={user.nickname} />
        </>
      );
    }

    return <Logo />;
  };

  return (
    <header className="sticky top-0 z-10 h-60 border-b border-border-secondary bg-background-secondary">
      <div className="mx-24 flex h-full items-center justify-between lg:mx-150">
        {renderContent()}
      </div>
    </header>
  );
};

export default NavBar;
