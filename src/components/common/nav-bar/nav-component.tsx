"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useClickOutside, useIsMobile, useToggle } from "@/hooks";
import { IconDropdown, IconPlusCurrent, IconUser } from "@/public/assets/icons";
import LogoImage from "@/public/assets/images/logo-coworkers.png";
import { User } from "@/types/user";

import DropDown from "../drop-down";
import IconButton from "../icon-button";

interface TeamDropdownProps {
  user: User;
}

const TeamDropdown = ({ user }: TeamDropdownProps) => {
  const teamDropdown = useToggle();
  const teams = user.memberships;
  const firstTeamName = teams[0].group.name;

  return (
    <div className="mt-1 whitespace-nowrap text-16-500 text-text-primary">
      <DropDown handleClose={teamDropdown.handleOff}>
        <DropDown.Trigger onClick={teamDropdown.handleToggle}>
          <div className="flex items-center">
            {firstTeamName}
            <IconDropdown className="ml-8" />
          </div>
        </DropDown.Trigger>
        <DropDown.Menu
          isOpen={teamDropdown.value}
          position="top-50 right-0"
          className="w-140"
        >
          {teams.map((membership) => (
            <DropDown.Item key={membership.group.id}>
              <div className="flex items-center">
                <div className="ml-12 size-32 rounded-md bg-point-blue" />
                <span className="ml-12">{membership.group.name}</span>
              </div>
            </DropDown.Item>
          ))}
          <DropDown.Item>
            <div className="flex items-center justify-center">
              <IconPlusCurrent className="mr-5 stroke-white" />팀 추가하기
            </div>
          </DropDown.Item>
        </DropDown.Menu>
      </DropDown>
    </div>
  );
};

interface UserDropdownProps {
  user: User;
}

const UserDropdown = ({ user }: UserDropdownProps) => {
  const userDropdown = useToggle();
  const userNickname = user.nickname;

  return (
    <div className="text-md-medium flex items-center justify-center whitespace-nowrap text-text-primary">
      <DropDown handleClose={userDropdown.handleOff}>
        <DropDown.Trigger onClick={userDropdown.handleToggle}>
          <div className="flex items-center">
            <IconUser className="mr-12" />
            <span className="hidden lg:inline">{userNickname}</span>
          </div>
        </DropDown.Trigger>
        <DropDown.Menu
          isOpen={userDropdown.value}
          position="top-50 right-0 lg:left-0"
        >
          <DropDown.Item>마이 히스토리</DropDown.Item>
          <DropDown.Item>계정 설정</DropDown.Item>
          <DropDown.Item>팀 참여</DropDown.Item>
          <DropDown.Item>로그아웃</DropDown.Item>
        </DropDown.Menu>
      </DropDown>
    </div>
  );
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const NavSideBar = ({ isOpen, onClose, user }: SidebarProps) => {
  const sidebarRef = useClickOutside(onClose);
  const teams = user?.memberships ?? [];
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <motion.div
      ref={sidebarRef}
      className="fixed left-0 top-0 h-full w-1/2 bg-background-secondary"
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? "0%" : "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <IconButton
        icon="IconX"
        variant="none"
        isBorder={false}
        onClick={onClose}
        className="absolute right-22 top-22"
      />
      <div className="ml-16 mt-75">
        <ul className="space-y-24">
          {teams.map((membership) => (
            <li key={membership.group.id}>
              <Link
                href={`/team${membership.group.id}`}
                onClick={handleLinkClick}
              >
                {membership.group.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-24">
          <Link href="/" onClick={handleLinkClick}>
            자유게시판
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

interface LogoProps {
  user: User | null;
}

const Logo = ({ user }: LogoProps) => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {isMobile && (
        <IconButton
          icon="IconGnbMenu"
          variant="none"
          onClick={toggleSidebar}
          className="shrink-0"
        />
      )}
      <div className="relative w-158 shrink-0">
        <Link href="/">
          <Image src={LogoImage} alt="코워커스 로고" className="object-fill" />
        </Link>
      </div>
      <NavSideBar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
      />
    </>
  );
};

export { Logo, NavSideBar, TeamDropdown, UserDropdown };
