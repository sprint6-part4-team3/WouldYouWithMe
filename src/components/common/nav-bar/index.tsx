"use client";

import clsx from "clsx";
import Image from "next/image";

import useToggle from "@/hooks/use-toggle";
import { IconDropdown, IconUser } from "@/public/assets/icons";
import LogoImage from "@/public/assets/images/logo-coworkers.png";

import DropDown from "../drop-down";

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
  const teamDropdown = useToggle();
  const userDropdown = useToggle();

  const renderContent = () => {
    if (user && team) {
      return (
        <>
          <div className="flex items-center whitespace-nowrap text-16-500 text-text-primary">
            <div className="mr-12 size-32 rounded-md bg-brand-primary" />
            <div className="flex items-center">
              {team.name}
              <DropDown handleClose={teamDropdown.handleOff}>
                <DropDown.Trigger onClick={teamDropdown.handleToggle}>
                  <IconDropdown className="ml-12 mt-3" />
                </DropDown.Trigger>
                <DropDown.Menu
                  isOpen={teamDropdown.value}
                  position="top-50 right-0"
                  className="w-140"
                >
                  <DropDown.Item>
                    <div className="flex items-center">
                      <div className="ml-12 size-32 rounded-md bg-point-blue" />
                      <span className="ml-12">경영관리 팀</span>
                    </div>
                  </DropDown.Item>
                  <DropDown.Item>
                    <div className="flex items-center">
                      <div className="ml-12 size-32 rounded-md bg-point-green" />
                      <span className="ml-12">프로덕트 팀</span>
                    </div>
                  </DropDown.Item>
                  <DropDown.Item>
                    <div className="flex items-center">
                      <div className="ml-12 size-32 rounded-md bg-point-rose" />
                      <span className="ml-12">마케팅 팀</span>
                    </div>
                  </DropDown.Item>
                  <DropDown.Item>팀추가하기버튼</DropDown.Item>
                </DropDown.Menu>
              </DropDown>
            </div>
          </div>
          <div className="text-md-medium flex items-center justify-center whitespace-nowrap text-text-primary">
            <DropDown handleClose={userDropdown.handleOff}>
              <DropDown.Trigger onClick={userDropdown.handleToggle}>
                <IconUser className="mr-12" />
              </DropDown.Trigger>
              <DropDown.Menu
                isOpen={userDropdown.value}
                position="top-50 right-0 lg:left-0"
              >
                <DropDown.Item>마이 히스토리</DropDown.Item>
                <DropDown.Item>계정 설정</DropDown.Item>
                <DropDown.Item>로그아웃</DropDown.Item>
              </DropDown.Menu>
            </DropDown>
            <span className={clsx("hidden", "xl:inline")}>{user.nickname}</span>
          </div>
        </>
      );
    }

    if (user) {
      return (
        <>
          <div className="relative w-102 shrink-0 xl:w-158">
            <Image
              src={LogoImage}
              alt="코워커스 로고"
              className="object-fill"
            />
          </div>
          <div className="text-md-medium flex items-center justify-center whitespace-nowrap text-text-primary">
            <DropDown handleClose={userDropdown.handleOff}>
              <DropDown.Trigger onClick={userDropdown.handleToggle}>
                <IconUser className="mr-12" />
              </DropDown.Trigger>
              <DropDown.Menu
                isOpen={userDropdown.value}
                position="top-50 right-0 lg:left-0"
              >
                <DropDown.Item>마이 히스토리</DropDown.Item>
                <DropDown.Item>계정 설정</DropDown.Item>
                <DropDown.Item>로그아웃</DropDown.Item>
              </DropDown.Menu>
            </DropDown>
            <span className={clsx("hidden", "xl:inline")}>{user.nickname}</span>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="relative w-102 shrink-0 xl:w-158">
          <Image src={LogoImage} alt="코워커스 로고" className="object-fill" />
        </div>
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
