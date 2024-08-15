"use client";

import { useState } from "react";

import { Button, Drawer, FloatButton, Input, Modal } from "@/components/common";
import { useIsMobile, useToast } from "@/hooks";
import deleteTaskList from "@/lib/api/task-list/delete-task-list";
import { LoadingSpinner } from "@/public/assets/icons";
import { GroupTask } from "@/types/group";

interface TeamDeleteModalProps {
  task: GroupTask;
  onClose: () => void;
  onDeleteTask: (newTask: GroupTask) => void;
}

const TeamDeleteModal = ({
  task,
  onClose,
  onDeleteTask,
}: TeamDeleteModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const isMobile = useIsMobile();

  const deleteTeam = async () => {
    try {
      setIsLoading(true);
      await deleteTaskList(task.groupId, task.id);
      onDeleteTask(task);
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
      description={task.name}
    >
      <div>
        {isLoading ? (
          <FloatButton
            variant="danger"
            className="h-48 w-280"
            Icon={<LoadingSpinner width={30} height={30} />}
            disabled={isLoading}
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
