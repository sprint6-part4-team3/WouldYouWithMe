"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import { useToggle } from "@/hooks";
import { IconDropdown, IconUser } from "@/public/assets/icons";
import LogoImage from "@/public/assets/images/logo-coworkers.png";

import DropDown from "../drop-down";

interface TeamDropdownProps {
  teamName: string;
}

const TeamDropdown = ({ teamName }: TeamDropdownProps) => {
  const teamDropdown = useToggle();

  return (
    <div className="mt-1 whitespace-nowrap text-16-500 text-text-primary">
      <DropDown handleClose={teamDropdown.handleOff}>
        <DropDown.Trigger onClick={teamDropdown.handleToggle}>
          <div className="flex items-center">
            {teamName}
            <IconDropdown className="ml-8" />
          </div>
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
          <DropDown.Item>+ 팀 추가하기</DropDown.Item>
        </DropDown.Menu>
      </DropDown>
    </div>
  );
};

interface UserDropdownProps {
  userNickname: string;
}

const UserDropdown = ({ userNickname }: UserDropdownProps) => {
  const userDropdown = useToggle();

  return (
    <div className="text-md-medium flex items-center justify-center whitespace-nowrap text-text-primary">
      <DropDown handleClose={userDropdown.handleOff}>
        <DropDown.Trigger onClick={userDropdown.handleToggle}>
          <div className="flex items-center">
            <IconUser className="mr-12" />
            <span className={clsx("hidden", "xl:inline")}>{userNickname}</span>
          </div>
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
    </div>
  );
};

const Logo = () => (
  <div className="relative w-102 shrink-0 xl:w-158">
    <Link href="/">
      <Image src={LogoImage} alt="코워커스 로고" className="object-fill" />
    </Link>
  </div>
);

export { Logo, TeamDropdown, UserDropdown };
