"use client";

import Image from "next/image";

import { DropDown, IconButton } from "@/components/common";
import { useToggle } from "@/hooks";
import { TeamCardThumbnail } from "@/public/assets/images";

const TeamCardDropdownButton = () => {
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
  <article className="relative m-auto my-24 flex h-64 w-full items-center justify-between rounded-12 border border-border-primary/10 bg-slate-50/10 px-24">
    <h1 className="text-20-700">경영관리팀</h1>
    <div className="flex items-center gap-30">
      <TeamCardDropdownButton />
    </div>
    <Image
      src={TeamCardThumbnail}
      alt=""
      draggable="false"
      className="absolute right-90 z-0"
    />
  </article>
);

export default TeamCardBox;
