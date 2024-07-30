"use client";

import React from "react";

import DropDown from "@/components/common/drop-down";
import useToggle from "@/hooks/use-toggle";
import { IconProfile } from "@/public/assets/icons";

import ProfileModal from "./profile-modal";

// 드롭다운
const MemberDropdown = () => {
  const { value, handleToggle, handleOff } = useToggle();

  return (
    <DropDown handleClose={handleOff}>
      <DropDown.Trigger onClick={handleToggle}>
        <span className="cursor-pointer text-16-700 text-text-primary">⋮</span>
      </DropDown.Trigger>
      <DropDown.Menu isOpen={value}>
        <DropDown.Item>삭제하기</DropDown.Item>
        <DropDown.Item>수정하기</DropDown.Item>
      </DropDown.Menu>
    </DropDown>
  );
};

const Card = () => {
  const { value, handleOn, handleOff } = useToggle();

  return (
    <div className="rounded-16 bg-background-secondary px-16 py-12  md:px-20 md:py-16 lg:px-24 lg:py-20">
      {/* PC, 테블릿 */}
      <div className="hidden items-center justify-between md:flex">
        <div
          onClick={handleOn}
          className="group flex cursor-pointer items-center gap-12"
        >
          <div className="flex-1">
            <IconProfile
              width={24}
              height={24}
              className="size-24 md:size-28 lg:size-32"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <span className="group-hover text-14-700">우지은</span>
            <span className="group-hover text-12-400 text-text-secondary">
              jieun@codeit.com
            </span>
          </div>
        </div>
        <MemberDropdown />
      </div>
      {/* 모바일 */}
      <div className="flex items-center justify-between md:hidden">
        <div onClick={handleOn} className="group cursor-pointer">
          <div className="flex items-center gap-6">
            <IconProfile width={24} height={24} />
            <span className="group-hover text-14-700">우지은</span>
          </div>
          <span className="group-hover text-12-400 text-text-secondary">
            jieun@codeit.com
          </span>
        </div>
        <MemberDropdown />
      </div>
      <ProfileModal isOpen={value} onClose={handleOff} />
    </div>
  );
};

export default Card;
