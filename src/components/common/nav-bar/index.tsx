"use client";

import { Logo, TeamDropdown, UserDropdown } from "./nav-component";

// 임시로 넣었습니다. api 작업 후 수정할 예정입니다.
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
          <TeamDropdown teamName={team.name} />
          <UserDropdown userNickname={user.nickname} />
        </>
      );
    }

    if (user) {
      return (
        <>
          <Logo />
          <UserDropdown userNickname={user.nickname} />
        </>
      );
    }

    return (
      <>
        <Logo />
        <span className="whitespace-nowrap text-text-primary">로그인</span>
      </>
    );
  };

  return (
    <header className="sticky top-0 z-10 h-60 border-b border-border-primary bg-background-secondary">
      <div className="mx-16 flex h-full items-center justify-between lg:mx-200 xl:mx-360">
        {renderContent()}
      </div>
    </header>
  );
};

export default NavBar;
