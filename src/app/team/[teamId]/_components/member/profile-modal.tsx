"use client";

import Image from "next/image";

import { Drawer, Modal } from "@/components/common";
import { useIsMobile } from "@/hooks";
import { IconProfileCurrent } from "@/public/assets/icons";
import { GroupMember } from "@/types/user";

interface ProfileModalProps {
  onClose: () => void;
  member: GroupMember;
  teamName: string;
}

const ProfileModal = ({ onClose, member, teamName }: ProfileModalProps) => {
  const isMobile = useIsMobile();

  const CommonComponent = isMobile ? Drawer : Modal;

  return (
    <CommonComponent showCloseButton onClose={onClose} title="">
      <div className="flex w-full flex-col items-center justify-center gap-24">
        {member.userImage && member.userImage !== "Invalid Date" ? (
          <Image
            width={52}
            height={52}
            src={member.userImage}
            alt={`${member.userName}프로필 사진`}
            className="rounded-full object-cover"
          />
        ) : (
          <IconProfileCurrent width={52} height={52} />
        )}
        <div className="flex flex-col items-center gap-8">
          <span className="text-14-500">
            {member.userName}
            {member.role === "ADMIN" && (
              <span className="ml-4 text-12-400 text-brand-secondary">
                (관리자)
              </span>
            )}
          </span>
          <span className="text-12-400 text-text-secondary">
            {member.userEmail}
          </span>
        </div>
        <a
          className="flex h-47 w-full cursor-pointer items-center justify-center rounded-12 bg-brand-primary text-16-600 text-text-inverse hover:bg-interaction-hover disabled:bg-interaction-inactive"
          href={`mailto:${member.userEmail}?subject=[우주윗미] ${teamName} 팀에서 보낸 메일입니다.`}
        >
          이메일 보내기
        </a>
      </div>
    </CommonComponent>
  );
};

export default ProfileModal;
