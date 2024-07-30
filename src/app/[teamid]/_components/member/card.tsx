"use client";

import React from "react";

import DropDown from "@/components/common/drop-down";
import useToggle from "@/hooks/use-toggle";
import { IconProfile } from "@/public/assets/icons";

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

const Card = () => (
  <div className="rounded-16 bg-background-secondary px-16 py-12 md:px-20 md:py-16 lg:px-24 lg:py-20">
    <div className="hidden items-center justify-between md:flex">
      <div className="flex items-center gap-12">
        <div className="flex-1">
          <IconProfile
            width={24}
            height={24}
            className="size-24 md:size-28 lg:size-32"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <span className="text-14-700">우지은</span>
          <span className="truncate text-12-400 text-text-secondary">
            jieun@codeit.com
          </span>
        </div>
      </div>
      <MemberDropdown />
    </div>
    <div className="flex items-center justify-between md:hidden">
      <div>
        <div className="flex items-center gap-6">
          <IconProfile width={24} height={24} />
          <span className="text-14-700">우지은</span>
        </div>
        <span className="text-12-400 text-text-secondary">
          jieun@codeit.com
        </span>
      </div>
      <MemberDropdown />
    </div>
  </div>
);

export default Card;
