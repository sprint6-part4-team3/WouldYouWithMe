"use client";

import Link from "next/link";
import { useState } from "react";

import { useToggle } from "@/hooks";
import { IconUser } from "@/public/assets/icons";
import { User } from "@/types/user";

import DropDown from "../common/drop-down";
import LogoutModal from "./logout-modal";

interface UserDropdownProps {
  user: User;
}

const UserDropdown = ({ user }: UserDropdownProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userDropdown = useToggle();
  const userNickname = user.nickname;

  const openModal = () => {
    setIsModalOpen(true);
    userDropdown.handleOff();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
          <Link href="/user-setting">
            <DropDown.Item>계정 설정</DropDown.Item>
          </Link>
          <DropDown.Item>팀 참여</DropDown.Item>
          <DropDown.Item onClick={openModal}>로그아웃</DropDown.Item>
        </DropDown.Menu>
      </DropDown>

      <LogoutModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default UserDropdown;
