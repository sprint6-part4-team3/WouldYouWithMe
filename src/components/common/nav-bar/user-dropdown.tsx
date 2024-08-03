"use client";

import { useToggle } from "@/hooks";
import { IconUser } from "@/public/assets/icons";
import { User } from "@/types/user";

import DropDown from "../drop-down";

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

export default UserDropdown;
