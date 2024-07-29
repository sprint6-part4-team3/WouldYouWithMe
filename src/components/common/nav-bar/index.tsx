/* eslint-disable no-console */

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

  const closeDropDowns = () => {
    teamDropdown.handleOff();
    userDropdown.handleOff();
  };

  const renderContent = () => {
    if (user && team) {
      return (
        <>
          <div className="flex items-center whitespace-nowrap text-16-500 text-text-primary">
            <div className="mr-12 size-32 rounded-md bg-brand-primary" />
            <div className="flex items-center">
              {team.name}
              <DropDown handleClose={closeDropDowns}>
                <DropDown.Trigger onClick={teamDropdown.handleToggle}>
                  <IconDropdown className="ml-12 mt-3" />
                </DropDown.Trigger>
                <DropDown.Menu isOpen={teamDropdown.value}>
                  <DropDown.Item
                    onClick={() => console.log("마이 히스토리 클릭")}
                  >
                    마이 히스토리
                  </DropDown.Item>
                  <DropDown.Item onClick={() => console.log("계정 설정 클릭")}>
                    계정 설정
                  </DropDown.Item>
                  <DropDown.Item onClick={() => console.log("로그아웃 클릭")}>
                    로그아웃
                  </DropDown.Item>
                </DropDown.Menu>
              </DropDown>
            </div>
          </div>
          <div className="text-md-medium flex items-center justify-center whitespace-nowrap text-text-primary">
            <DropDown handleClose={closeDropDowns}>
              <DropDown.Trigger onClick={userDropdown.handleToggle}>
                <IconUser className="mr-12" />
              </DropDown.Trigger>
              <DropDown.Menu isOpen={userDropdown.value}>
                <DropDown.Item
                  onClick={() => console.log("마이 히스토리 클릭")}
                >
                  마이 히스토리
                </DropDown.Item>
                <DropDown.Item onClick={() => console.log("계정 설정 클릭")}>
                  계정 설정
                </DropDown.Item>
                <DropDown.Item onClick={() => console.log("로그아웃 클릭")}>
                  로그아웃
                </DropDown.Item>
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
            <DropDown handleClose={closeDropDowns}>
              <DropDown.Trigger onClick={userDropdown.handleToggle}>
                <IconUser className="mr-12" />
              </DropDown.Trigger>
              <DropDown.Menu isOpen={userDropdown.value}>
                <DropDown.Item
                  onClick={() => console.log("마이 히스토리 클릭")}
                >
                  마이 히스토리
                </DropDown.Item>
                <DropDown.Item onClick={() => console.log("계정 설정 클릭")}>
                  계정 설정
                </DropDown.Item>
                <DropDown.Item onClick={() => console.log("로그아웃 클릭")}>
                  로그아웃
                </DropDown.Item>
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
