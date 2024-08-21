"use client";

import { useAtom, useSetAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { DropDown, IconButton } from "@/components/common";
import { useToggle } from "@/hooks";
import { TeamCardThumbnail } from "@/public/assets/images";
import { recentTeamAtom, userAtom } from "@/stores";

import TeamDeleteModal from "./delete-team-modal";

interface TeamCardBoxDropdownProps {
  teamId: number;
  teamName: string;
}

const TeamCardDropdownButton = ({
  teamId,
  teamName,
}: TeamCardBoxDropdownProps) => {
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
        <Link href={`/team/${teamId}/edit`}>
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

interface TeamCardBoxProps {
  teamId: number;
  teamName: string;
  adminId: number;
  teamImage: string | null;
}

const TeamCardBox = ({
  teamName,
  teamId,
  adminId,
  teamImage,
}: TeamCardBoxProps) => {
  const [user] = useAtom(userAtom);
  const userId = user.id;
  const setRecentTeam = useSetAtom(recentTeamAtom(userId));

  useEffect(() => {
    setRecentTeam({
      teamName,
      groupId: teamId,
    });
  }, [teamName, teamId, setRecentTeam]);

  return (
    <article className="relative m-auto flex h-64 w-full items-center justify-between rounded-12 border border-border-primary/10 bg-slate-50/10 px-24">
      <div className="flex items-center gap-12">
        <div className="relative size-40">
          {teamImage ? (
            <Image
              className="rounded-lg object-cover"
              src={teamImage}
              alt="팀 이미지"
              fill
            />
          ) : (
            <Image
              className="rounded-lg object-cover"
              src="/assets/images/img-planet.png"
              alt="팀 이미지"
              fill
            />
          )}
        </div>
        <h1 className="text-20-700">{teamName}</h1>
      </div>
      {userId === adminId && (
        <div className="flex items-center gap-30">
          <TeamCardDropdownButton teamName={teamName} teamId={teamId} />
        </div>
      )}
      <Image
        src={TeamCardThumbnail}
        alt="팀카드 장식"
        draggable="false"
        className="absolute right-90 z-0"
        priority
      />
    </article>
  );
};

export default TeamCardBox;
