"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { Button, Drawer, FloatButton, Modal } from "@/components/common";
import { useIsMobile, useToast, useToggle } from "@/hooks";
import createInvitationToken from "@/lib/api/group/create-invitation-token";
import { IconPlusCurrent, LoadingSpinner } from "@/public/assets/icons";

import RedirectBoardModal from "./redirect-board-modal";

const AddMemberModal = () => {
  const pathname = usePathname();

  const teamId = useMemo(() => pathname.split("/")[2], [pathname]);

  const { value: isOpen, handleOn, handleOff } = useToggle();
  const {
    value: isOpenBoard,
    handleOn: boardHandleOn,
    handleOff: boardHandleOff,
  } = useToggle();

  const toast = useToast();
  const isMobile = useIsMobile();

  const { data, isLoading } = useQuery({
    queryKey: ["token", teamId],
    queryFn: () => createInvitationToken(Number(teamId)),
    staleTime: 60000 * 60,
    enabled: !!isOpen,
  });

  const copyToClipboard = () => {
    if (data) {
      navigator.clipboard
        .writeText(data)
        .then(() => {
          toast.success("링크가 생성되어 복사되었습니다.");
          handleOff();
          boardHandleOn();
        })
        .catch(() => {
          toast.error("링크가 복사되지 않았습니다.");
        });
    }
  };

  const ModalComponent = isMobile ? Drawer : Modal;

  return (
    <>
      <div
        onClick={handleOn}
        className="flex h-72 cursor-pointer items-center gap-4 rounded-16 border-4 border-dotted border-background-tertiary px-16 py-12 text-16-700 text-brand-primary hover:bg-background-secondary/50 md:h-auto  md:px-20 md:py-16 lg:px-24 lg:py-20"
      >
        <IconPlusCurrent stroke="#22b8cf" />
        멤버 추가하기
      </div>
      {isOpen && (
        <ModalComponent
          showCloseButton
          onClose={handleOff}
          title="멤버 초대"
          description="그룹에 참여할 수 있는 토큰을 복사합니다."
        >
          <span className="max-w-full truncate rounded-10 border border-border-primary bg-background-tertiary px-10 py-12 text-text-secondary">
            {isLoading ? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" : data}
          </span>
          <Button
            className="mt-16 h-47 w-full"
            variant="primary"
            onClick={copyToClipboard}
          >
            복사하기
          </Button>
        </ModalComponent>
      )}
      {isOpenBoard && (
        <RedirectBoardModal isMobile={isMobile} handleOff={boardHandleOff} />
      )}
    </>
  );
};

export default AddMemberModal;
