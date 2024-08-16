"use client";

import { useMutation } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

import {
  Button,
  Drawer,
  DropDown,
  FloatButton,
  Input,
  Modal,
} from "@/components/common";
import { useIsMobile, useToast, useToggle } from "@/hooks";
import deleteMember from "@/lib/api/group/delete-member";
import { LoadingSpinner } from "@/public/assets/icons";

/** 멤버 삭제 모달 */
interface DeleteMemberModalProps {
  onClose: () => void;
  userId: number;
  memberId: number;
  memberName: string;
}

const DeleteMemberModal = ({
  onClose,
  userId,
  memberId,
  memberName,
}: DeleteMemberModalProps) => {
  const [inputValue, setInputValue] = useState("");

  const toast = useToast();
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();

  const ModalComponent = isMobile ? Drawer : Modal;

  const groupId = useMemo(() => Number(pathname.split("/")[1]), [pathname]);

  const isSameMember = useMemo(() => userId === memberId, [userId, memberId]);

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteMember(groupId, memberId),
    onSuccess: () => {
      router.refresh();
      toast.success(
        isSameMember
          ? "해당 팀을 탈퇴하였습니다"
          : "해당 멤버를 추방하였습니다",
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      onClose();
    },
  });

  const handleSubmitDelete = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <ModalComponent
      showWarningIcon
      onClose={onClose}
      title={isSameMember ? "그룹 탈퇴" : "그룹 추방"}
      description={
        isSameMember
          ? "탈퇴할 멤버의 닉네임을 입력해주세요"
          : "추방할 멤버의 닉네임을 입력해주세요"
      }
    >
      <form onSubmit={handleSubmitDelete}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          id="delete-member"
          placeholder={memberName}
        />

        {isPending ? (
          <FloatButton
            variant="primary"
            disabled
            className="mt-16 h-47 w-full"
            Icon={<LoadingSpinner width={30} height={30} />}
          >
            {isSameMember ? "탈퇴중" : "추방중"}
          </FloatButton>
        ) : (
          <Button
            type="submit"
            disabled={inputValue !== memberName}
            variant={inputValue !== memberName ? "primary" : "danger"}
            className="mt-16 h-47 w-full"
          >
            {isSameMember ? "탈퇴하기" : "추방하기"}
          </Button>
        )}
      </form>
    </ModalComponent>
  );
};

/** 멤버 드롭다운 */
interface MemberDropDownProps {
  /** 내 아이디 */
  userId: number;
  /** 클릭한 유저 아이디 */
  memberId: number;
  /** 클릭한 유저 이름 */
  memberName: string;
}

const MemberDropDown = ({
  userId,
  memberId,
  memberName,
}: MemberDropDownProps) => {
  const { value, handleToggle, handleOff } = useToggle();

  const {
    value: isOpenModal,
    handleOn: handleOnModal,
    handleOff: handleOffModal,
  } = useToggle();

  return (
    <>
      <DropDown handleClose={handleOff}>
        <DropDown.Trigger onClick={handleToggle}>
          <span className="cursor-pointer text-16-700 text-text-primary">
            ⋮
          </span>
        </DropDown.Trigger>
        <DropDown.Menu isOpen={value}>
          <DropDown.Item
            onClick={() => {
              handleOnModal();
              handleOff();
            }}
          >
            {userId === memberId ? "탈퇴하기" : "추방하기"}
          </DropDown.Item>
        </DropDown.Menu>
      </DropDown>
      {isOpenModal && (
        <DeleteMemberModal
          memberName={memberName}
          userId={userId}
          memberId={memberId}
          onClose={handleOffModal}
        />
      )}
    </>
  );
};

export default MemberDropDown;
