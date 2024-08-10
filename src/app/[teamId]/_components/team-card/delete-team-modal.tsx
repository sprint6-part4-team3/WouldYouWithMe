"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

import { Button, Drawer, Input, Modal } from "@/components/common";
import { useIsMobile, useToast } from "@/hooks";
import deleteGroup from "@/lib/api/group/delete-group";

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
  const toast = useToast();
  const isMobile = useIsMobile();

  const deleteTeam = async () => {
    if (value === teamName) {
      setIsLoading(true);
      try {
        toast.success("팀이 삭제되고 있습니다!");
        const timerId = setTimeout(() => {
          toast.success("팀이 삭제 되었습니다.");
        }, 5000);
        await deleteGroup(teamId);
        onClose();
        redirect("/not-found");
      } catch (error) {
        toast.error("팀 삭제에 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    }
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
      title="팀 삭제 하실건가요?"
      description="삭제할 팀 이름을 적어주세요."
    >
      <div>
        <Input
          id="delete-team"
          placeholder={teamName}
          value={value}
          onChange={handleChange}
        />
        <Button
          onClick={deleteTeam}
          variant={buttonVariant}
          className="mt-16 h-47 w-full"
          disabled={value !== teamName}
        >
          {isLoading ? "처리 중..." : "팀 삭제하기"}
        </Button>
      </div>
    </ModalComponent>
  );
};

export default TeamDeleteModal;
