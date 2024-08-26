"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { Button, Drawer, FloatButton, Input, Modal } from "@/components/common";
import { useIsMobile, useToast } from "@/hooks";
import deleteGroup from "@/lib/api/group/delete-group";
import { LoadingSpinner } from "@/public/assets/icons";
import { recentTeamAtom, userAtom } from "@/stores";
import groupIdListAtom from "@/stores/group-list";
import { User } from "@/types/user";

interface TeamDeleteModalProps {
  teamId: number;
  teamName: string;
  onClose: () => void;
}

const TeamDeleteModal = ({
  teamId,
  teamName,
  onClose,
}: TeamDeleteModalProps) => {
  const queryClient = useQueryClient();
  const [user] = useAtom(userAtom);
  const userId = user.id;
  const router = useRouter();

  const [groupIdList] = useAtom(groupIdListAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const toast = useToast();
  const isMobile = useIsMobile();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setRecentTeam = useSetAtom(recentTeamAtom(userId));

  const deleteTeam = async () => {
    if (value !== teamName) return;
    setIsLoading(true);
    timeoutRef.current = setTimeout(async () => {
      try {
        await deleteGroup(teamId);

        toast.success("팀이 삭제 되었습니다.");

        if (groupIdList.length <= 1) {
          queryClient.invalidateQueries({ queryKey: ["userData"] });
          setRecentTeam({
            teamName: "",
            groupId: 0,
          });
          router.replace("/team-empty");
        } else {
          queryClient.invalidateQueries({ queryKey: ["userData"] });
          const cachedData = queryClient.getQueryData<User>(["userData"]);
          if (cachedData) {
            setRecentTeam({
              teamName:
                groupIdList[0] === teamId
                  ? cachedData.memberships[1].group.name
                  : cachedData.memberships[0].group.name,
              groupId:
                groupIdList[0] === teamId ? groupIdList[1] : groupIdList[0],
            });
            window.location.replace(`/my-teams`);
          }
        }
      } catch (error) {
        toast.error("팀 삭제에 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    }, 3000);
  };

  // 팀 삭제 타이머 취소
  const cancelDeletion = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsLoading(false);
    onClose();
    toast.error("팀 삭제가 취소되었습니다.");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const ModalComponent = isMobile ? Drawer : Modal;
  const buttonVariant = isLoading || value !== teamName ? "primary" : "danger";

  return (
    <ModalComponent
      showWarningIcon
      showCloseButton
      onClose={onClose}
      title="팀을 삭제 하실건가요?"
      description="삭제할 팀 이름을 적어주세요."
    >
      <div>
        <Input
          id="delete-team"
          placeholder={teamName}
          value={value}
          onChange={handleChange}
        />
        {isLoading ? (
          <FloatButton
            onClick={cancelDeletion}
            variant="danger"
            className="mt-16 h-47 w-full"
            Icon={<LoadingSpinner width={30} height={30} />}
          >
            팀 삭제 취소
          </FloatButton>
        ) : (
          <Button
            onClick={deleteTeam}
            variant={buttonVariant}
            className="mt-16 h-47 w-full"
            disabled={value !== teamName || isLoading}
          >
            팀 삭제하기
          </Button>
        )}
      </div>
    </ModalComponent>
  );
};

export default TeamDeleteModal;
