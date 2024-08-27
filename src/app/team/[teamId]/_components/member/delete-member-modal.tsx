"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

import { Button, Drawer, FloatButton, Input, Modal } from "@/components/common";
import { useIsMobile, useToast } from "@/hooks";
import deleteMember from "@/lib/api/group/delete-member";
import { LoadingSpinner } from "@/public/assets/icons";
import { recentTeamAtom } from "@/stores";
import groupIdListAtom from "@/stores/group-list";
import { User } from "@/types/user";

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
  const queryClient = useQueryClient();
  const [groupIdList] = useAtom(groupIdListAtom);
  const [inputValue, setInputValue] = useState("");

  const toast = useToast();
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();
  const setRecentTeam = useSetAtom(recentTeamAtom(userId));

  const ModalComponent = useMemo(() => (isMobile ? Drawer : Modal), [isMobile]);

  const groupId = useMemo(() => Number(pathname.split("/")[2]), [pathname]);

  const isSameMember = useMemo(() => userId === memberId, [userId, memberId]);

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteMember(groupId, memberId),
    onSuccess: () => {
      if (isSameMember) {
        if (groupIdList.length <= 1) {
          queryClient.invalidateQueries({ queryKey: ["userData"] });
          setRecentTeam({
            teamName: "",
            groupId: 0,
          });
          router.replace(`/team-empty`);
        } else {
          queryClient.invalidateQueries({ queryKey: ["userData"] });
          const cachedData = queryClient.getQueryData<User>(["userData"]);
          if (cachedData) {
            setRecentTeam({
              teamName:
                groupIdList[0] === groupId
                  ? cachedData.memberships[1].group.name
                  : cachedData.memberships[0].group.name,
              groupId:
                groupIdList[0] === groupId ? groupIdList[1] : groupIdList[0],
            });
            window.location.replace(`/my-teams`);
          }
        }
      } else {
        router.refresh();
      }
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
      title={isSameMember ? "그룹 탈퇴" : "멤버 추방"}
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

export default DeleteMemberModal;
