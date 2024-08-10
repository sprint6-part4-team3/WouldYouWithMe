"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useIsMobile, useToggle } from "@/hooks";
import { IconUser } from "@/public/assets/icons";
import { getCookie } from "@/utils/next-cookie";

import DropDown from "../common/drop-down";
import LogoutDrawer from "./logout-drawer";
import LogoutModal from "./logout-modal";

interface UserDropdownProps {
  user: string;
}

const UserDropdown = ({ user }: UserDropdownProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const userDropdown = useToggle();
  const isMobile = useIsMobile();

  const openModal = () => {
    setIsModalOpen(true);
    userDropdown.handleOff();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
    userDropdown.handleOff();
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="text-md-medium flex cursor-pointer items-center justify-center whitespace-nowrap text-text-primary">
      <DropDown handleClose={userDropdown.handleOff}>
        <DropDown.Trigger onClick={userDropdown.handleToggle}>
          <div className="flex items-center">
            <IconUser className="mr-12" />
            <span className="hidden lg:inline">{user}</span>
          </div>
        </DropDown.Trigger>
        <DropDown.Menu
          isOpen={userDropdown.value}
          position="top-50 right-0 lg:left-0"
        >
          <DropDown.Item>마이 히스토리</DropDown.Item>
          <Link href="/user-setting">
            <DropDown.Item>계정 설정</DropDown.Item>
          </Link>
          <DropDown.Item>팀 참여</DropDown.Item>
          <DropDown.Item onClick={isMobile ? openDrawer : openModal}>
            로그아웃
          </DropDown.Item>
        </DropDown.Menu>
      </DropDown>
      {isMobile ? (
        <LogoutDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
      ) : (
        <LogoutModal isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
};

export default UserDropdown;
