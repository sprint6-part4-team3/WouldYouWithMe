"use client";

import { useState } from "react";

import { Button, Drawer, FloatButton, Input, Modal } from "@/components/common";
import { useIsMobile, useToast } from "@/hooks";
import deleteTaskList from "@/lib/api/task-list/delete-task-list";
import { LoadingSpinner } from "@/public/assets/icons";

interface TeamDeleteModalProps {
  groupId: number;
  id: number;
  name: string;
  onClose: () => void;
}

const TeamDeleteModal = ({
  groupId,
  id,
  name,
  onClose,
}: TeamDeleteModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const isMobile = useIsMobile();

  const deleteTeam = async () => {
    try {
      setIsLoading(true);
      await deleteTaskList(groupId, id);
      onClose();
      toast.success("목록이 삭제 되었습니다.");
    } catch (error) {
      toast.error("목록 삭제에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const ModalComponent = isMobile ? Drawer : Modal;

  return (
    <ModalComponent
      showCloseButton
      onClose={onClose}
      title="목록을 삭제 하실건가요?"
      description={name}
    >
      <div>
        {isLoading ? (
          <FloatButton
            variant="danger"
            className="h-48 w-280"
            Icon={<LoadingSpinner width={30} height={30} />}
          >
            처리 중...
          </FloatButton>
        ) : (
          <Button onClick={deleteTeam} variant="danger" className="h-48 w-280">
            목록 삭제하기
          </Button>
        )}
      </div>
    </ModalComponent>
  );
};

export default TeamDeleteModal;
