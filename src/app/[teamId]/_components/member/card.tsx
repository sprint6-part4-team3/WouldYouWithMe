"use client";

import { useAtom } from "jotai";
import Image from "next/image";
import React from "react";

import { DropDown } from "@/components/common";
import { useToggle } from "@/hooks";
import { IconProfileCurrent } from "@/public/assets/icons";
import { userAtom } from "@/stores";
import { GroupMember } from "@/types/user";

import ProfileModal from "./profile-modal";

const MemberDropdown = () => {
  const { value, handleToggle, handleOff } = useToggle();

  return (
    <DropDown handleClose={handleOff}>
      <DropDown.Trigger onClick={handleToggle}>
        <span className="cursor-pointer text-16-700 text-text-primary">⋮</span>
      </DropDown.Trigger>
      <DropDown.Menu isOpen={value}>
        {/** TODO: 삭제하기 모달 만들면 좋을듯, 수정하기는 API에 없어서 뺌 */}
        <DropDown.Item>삭제하기</DropDown.Item>
      </DropDown.Menu>
    </DropDown>
  );
};

interface MemberCardProps {
  member: GroupMember;
  adminId: number;
}

const Card = ({ member, adminId }: MemberCardProps) => {
  const [user] = useAtom(userAtom);
  const {
    value: isProfileModalOpen,
    handleOn: openProfileModal,
    handleOff: closeProfileModal,
  } = useToggle();

  return (
    <div className="rounded-16 bg-background-secondary px-16 py-12  md:px-20 md:py-16 lg:px-24 lg:py-20">
      {/* PC, 테블릿 */}
      <div className="hidden items-center justify-between md:flex">
        <div
          onClick={openProfileModal}
          className="group flex cursor-pointer items-center gap-12"
        >
          <div className="relative size-28 flex-1 lg:size-32">
            {member.userImage ? (
              <Image
                fill
                src={member.userImage}
                alt={`${member.userName}프로필 사진`}
                className="rounded-full object-cover"
              />
            ) : (
              <IconProfileCurrent
                width={28}
                height={28}
                className="size-28 lg:size-32"
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-6">
              <span className="group-hover text-14-700">{member.userName}</span>
              {member.role === "ADMIN" && (
                <span className="text-12-400 text-brand-secondary">
                  (관리자)
                </span>
              )}
            </div>
            <span className="group-hover text-12-400 text-text-secondary">
              {member.userEmail}
            </span>
          </div>
        </div>
        {(user.id === member.userId || adminId) && <MemberDropdown />}
      </div>
      {/* 모바일 */}
      <div className="flex items-center justify-between md:hidden">
        <div onClick={openProfileModal} className="group cursor-pointer">
          <div className="flex items-center gap-6">
            <div className="relative size-24">
              {member.userImage ? (
                <Image
                  fill
                  src={member.userImage}
                  alt={`${member.userName}프로필 사진`}
                  className="rounded-full object-cover"
                />
              ) : (
                <IconProfileCurrent width={24} height={24} />
              )}
            </div>
            <span className="group-hover text-14-700">{member.userName}</span>
            {member.role === "ADMIN" && (
              <span className="text-12-400 text-brand-secondary">(관리자)</span>
            )}
          </div>
          <span className="group-hover text-12-400 text-text-secondary">
            {member.userEmail}
          </span>
        </div>
        {(user.id === member.userId || adminId) && <MemberDropdown />}
      </div>
      {isProfileModalOpen && (
        <ProfileModal member={member} onClose={closeProfileModal} />
      )}
    </div>
  );
};

export default Card;
