"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Button, Drawer, FloatButton, Modal } from "@/components/common";
import { useIsMobile, useTaskParams, useToast } from "@/hooks";
import deleteRecurringTask from "@/lib/api/task-detail/delete-recurring-task";
import deleteTaskDetail from "@/lib/api/task-detail/delete-task-detail";
import { LoadingSpinner } from "@/public/assets/icons";

interface TaskDeleteModalProps {
  onClose: () => void;
  id: number;
  recurringId?: string;
  frequency?: string;
}

const TaskDeleteModal = ({
  onClose,
  id,
  recurringId,
  frequency,
}: TaskDeleteModalProps) => {
  const { groupId, taskListId, taskId: paramId } = useTaskParams();
  const taskId = id;
  const isMobile = useIsMobile();
  const toast = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [deleteOption, setDeleteOption] = useState<"single" | "recurring">(
    "single",
  );

  const { mutate: mutateDeleteTask, isPending: isPendingDeleteTask } =
    useMutation({
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
        onClose();
        if (paramId) router.back();
      },
      onError: (error) => {
        toast.error(`태스크 삭제 실패: ${error.message}`);
        onClose();
      },
    });

  const { mutate: mutateDeleteRecurring, isPending: isPendingDeleteRecurring } =
    useMutation({
      mutationFn: () =>
        deleteRecurringTask(
          taskId.toString(),
          groupId.toString(),
          taskListId.toString(),
          recurringId!,
        ),
      onSuccess: () => {
        toast.success("반복 일정이 모두 삭제되었습니다.");
        queryClient.invalidateQueries({
          queryKey: ["tasks", groupId, taskListId],
        });
        onClose();
        if (paramId) router.back();
      },
      onError: (error) => {
        toast.error(`반복 일정 삭제 실패: ${error.message}`);
        onClose();
      },
    });

  const handleClickDelete = () => {
    if (deleteOption === "single") {
      mutateDeleteTask();
    } else {
      mutateDeleteRecurring();
    }
  };

  const isPending = isPendingDeleteTask || isPendingDeleteRecurring;

  const CommonComponent = isMobile ? Drawer : Modal;

  return (
    <CommonComponent
      showWarningIcon
      description="삭제한 태스크는 복구할 수 없습니다"
      onClose={onClose}
      title="태스크 삭제"
    >
      <div className="mb-20">
        <div className="mb-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="single"
              checked={deleteOption === "single"}
              onChange={() => setDeleteOption("single")}
              className="mr-2"
            />
            해당 할일 삭제
          </label>
        </div>
        {frequency !== "ONCE" && (
          <div>
            <label className="flex items-center">
              <input
                type="radio"
                value="recurring"
                checked={deleteOption === "recurring"}
                onChange={() => setDeleteOption("recurring")}
                className="mr-2"
              />
              해당 반복일정 모두 삭제
            </label>
          </div>
        )}
      </div>
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
