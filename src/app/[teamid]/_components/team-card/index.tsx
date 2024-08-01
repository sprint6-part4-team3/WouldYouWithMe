/* eslint-disable no-console */

"use client";

import Image from "next/image";

import { DropDown, IconButton } from "@/components/common";
import { useToggle } from "@/hooks";
import { TeamCardThumbnail } from "@/public/assets/images";

const TeamCardDropdown = () => {
  const { value, handleToggle, handleOff } = useToggle();

  return (
    <DropDown handleClose={handleOff}>
      <DropDown.Trigger onClick={handleToggle}>
        <span className="cursor-pointer text-16-700 text-text-primary">
          <IconButton icon="IconGear" variant="none" />
        </span>
      </DropDown.Trigger>
      <DropDown.Menu isOpen={value}>
        <DropDown.Item>삭제하기</DropDown.Item>
        <DropDown.Item>수정하기</DropDown.Item>
      </DropDown.Menu>
    </DropDown>
  );
};

const TeamCardBox = () => (
  <div className="m-auto my-24 flex h-64 w-full items-center justify-between rounded-12 border border-border-primary/10 bg-slate-50/10 px-24">
    <div className="text-20-700">경영관리팀</div>
    <div className="flex items-center gap-30">
      <Image src={TeamCardThumbnail} alt="" draggable="false" />
      <TeamCardDropdown />
    </div>
  </div>
);

export default TeamCardBox;
