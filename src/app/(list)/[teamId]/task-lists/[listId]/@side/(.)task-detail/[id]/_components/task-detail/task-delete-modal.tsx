import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

import { Button, Drawer, FloatButton, Modal } from "@/components/common";
import {
  useBackAndRefresh,
  useIsMobile,
  useTaskParams,
  useToast,
} from "@/hooks";
import deleteTaskDetail from "@/lib/api/task-detail/delete-task-detail";
import { LoadingSpinner } from "@/public/assets/icons";

interface TaskDeleteModalProps {
  onClose: () => void;
}

const TaskDeleteModal = ({ onClose }: TaskDeleteModalProps) => {
  const { groupId, taskListId, taskId } = useTaskParams();
  const isMobile = useIsMobile();
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const navigateBackAndRefresh = useBackAndRefresh();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      deleteTaskDetail(
        taskId.toString(),
        groupId.toString(),
        taskListId.toString(),
      ),
    onSuccess: () => {
      toast.success("태스크가 삭제되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["tasks", groupId, taskListId],
      });
      navigateBackAndRefresh();
    },
    onError: (error) => {
      toast.error(`태스크 삭제 실패: ${error.message}`);
      onClose();
    },
  });

  const handleClickDelete = () => {
    mutate();
  };

  const CommonComponent = isMobile ? Drawer : Modal;

  return (
    <CommonComponent
      showWarningIcon
      description="삭제한 태스크는 복구할 수 없습니다"
      onClose={onClose}
      title="태스크 삭제"
    >
      <div className="flex gap-8">
        <Button
          disabled={isPending}
          onClick={onClose}
          variant="secondary"
          className="h-48 w-136"
        >
          닫기
        </Button>
        {isPending ? (
          <FloatButton
            Icon={<LoadingSpinner width={30} height={30} />}
            disabled={isPending}
            onClick={handleClickDelete}
            variant="danger"
            className="h-48 w-136"
          >
            삭제중
          </FloatButton>
        ) : (
          <Button
            onClick={handleClickDelete}
            variant="danger"
            className="h-48 w-136"
          >
            삭제
          </Button>
        )}
      </div>
    </CommonComponent>
  );
};

export default TaskDeleteModal;
