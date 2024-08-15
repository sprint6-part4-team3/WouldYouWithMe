"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { Button, Drawer, FloatButton, Input, Modal } from "@/components/common";
import { useIsMobile, useToast } from "@/hooks";
import deleteGroup from "@/lib/api/group/delete-group";
import { LoadingSpinner } from "@/public/assets/icons";

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
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();
  const toast = useToast();
  const isMobile = useIsMobile();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const deleteTeam = async () => {
    if (value !== teamName) return;
    setIsLoading(true);
    timeoutRef.current = setTimeout(async () => {
      try {
        await deleteGroup(teamId);
        onClose();
        toast.success("팀이 삭제 되었습니다.");
        router.push("/not-found");
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
