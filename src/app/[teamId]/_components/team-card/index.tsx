"use client";

import { useSetAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { DropDown, IconButton } from "@/components/common";
import { useToggle } from "@/hooks";
import { TeamCardThumbnail } from "@/public/assets/images";
import { recentTeamAtom } from "@/stores";

import TeamDeleteModal from "./delete-team-modal";

interface TeamCardBoxProps {
  teamId: number;
  teamName: string;
}

const TeamCardDropdownButton = ({ teamId, teamName }: TeamCardBoxProps) => {
  const { value, handleToggle, handleOff } = useToggle();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsModalOpen(true);
    handleOff();
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  return (
    <DropDown handleClose={handleOff}>
      <DropDown.Trigger onClick={handleToggle}>
        <IconButton className="cursor-pointer" icon="IconGear" variant="none" />
      </DropDown.Trigger>
      <DropDown.Menu isOpen={value}>
        <Link href={`/${teamId}/edit`}>
          <DropDown.Item>수정하기</DropDown.Item>
        </Link>
        <DropDown.Item>
          <div onClick={openDeleteModal}>삭제하기</div>
        </DropDown.Item>
      </DropDown.Menu>
      {isModalOpen && (
        <TeamDeleteModal
          teamId={teamId}
          teamName={teamName}
          onClose={closeDeleteModal}
        />
      )}
    </DropDown>
  );
};

const TeamCardBox = ({ teamName, teamId }: TeamCardBoxProps) => {
  const setRecentTeam = useSetAtom(recentTeamAtom);

  setRecentTeam(teamName);

  return (
    <article className="relative m-auto flex h-64 w-full items-center justify-between rounded-12 border border-border-primary/10 bg-slate-50/10 px-24">
      <h1 className="text-20-700">{teamName}</h1>
      <div className="flex items-center gap-30">
        <TeamCardDropdownButton teamName={teamName} teamId={teamId} />
      </div>
      <Image
        src={TeamCardThumbnail}
        alt=""
        draggable="false"
        className="absolute right-90 z-0"
      />
    </article>
  );
};
export default TeamCardBox;
