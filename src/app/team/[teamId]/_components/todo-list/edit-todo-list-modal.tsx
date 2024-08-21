"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button, Drawer, FloatButton, Input, Modal } from "@/components/common";
import { useIsMobile, useToast } from "@/hooks";
import editTaskList from "@/lib/api/task-list/edit-task-list";
import taskListAddEditSchema from "@/lib/schemas/task-list";
import { LoadingSpinner } from "@/public/assets/icons";
import { GroupTask } from "@/types/group";
import { TaskListAddEditInput } from "@/types/task-list";

interface EditTodoListModalProps {
  task: GroupTask;
  onClose: () => void;
}

const EditTodoListModal = ({ task, onClose }: EditTodoListModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const isMobile = useIsMobile();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<TaskListAddEditInput>({
    resolver: zodResolver(taskListAddEditSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: task.name,
    },
  });

  const deleteTeam = async (data: TaskListAddEditInput) => {
    try {
      setIsLoading(true);
      await editTaskList(data, task.groupId, task.id);
      router.refresh();
      onClose();
      reset();
      toast.success("목록이 수정 되었습니다.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorMessage = error.response.data.message;
          toast.error(errorMessage);
        } else {
          toast.error("서버에서 에러가 발생했습니다");
        }
      } else {
        const errorMessage =
          (error as Error).message || "알 수 없는 에러가 발생했습니다";
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const ModalComponent = isMobile ? Drawer : Modal;

  return (
    <ModalComponent
      showCloseButton
      onClose={onClose}
      title="할 일 목록 수정"
      description="수정할 할 일 목록 이름을 입력해주세요"
    >
      <form
        className="flex flex-col gap-16"
        onSubmit={handleSubmit(deleteTeam)}
      >
        <Input
          {...register("name")}
          id="create-list"
          placeholder="수정할 목록 이름을 입력해주세요."
        />
        {isLoading ? (
          <FloatButton
            variant="primary"
            className="h-48 w-280"
            Icon={<LoadingSpinner width={30} height={30} />}
            disabled={!isValid || isLoading}
          >
            처리 중...
          </FloatButton>
        ) : (
          <Button variant="primary" className="h-48 w-280" type="submit">
            목록 수정하기
          </Button>
        )}
      </form>
    </ModalComponent>
  );
};

export default EditTodoListModal;
