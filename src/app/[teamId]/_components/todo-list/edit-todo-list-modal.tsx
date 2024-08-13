"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button, Drawer, FloatButton, Input, Modal } from "@/components/common";
import { useIsMobile, useToast } from "@/hooks";
import editTaskList from "@/lib/api/task-list/edit-task-list";
import taskListAddEditSchema from "@/lib/schemas/task-list";
import { LoadingSpinner } from "@/public/assets/icons";
import { TaskListAddEditInput } from "@/types/task-list";

interface EditTodoListModalProps {
  groupId: number;
  id: number;
  name: string;
  onClose: () => void;
}

const EditTodoListModal = ({
  groupId,
  id,
  name,
  onClose,
}: EditTodoListModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const isMobile = useIsMobile();

  const { register, handleSubmit, reset } = useForm<TaskListAddEditInput>({
    resolver: zodResolver(taskListAddEditSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const deleteTeam = async (data: TaskListAddEditInput) => {
    try {
      setIsLoading(true);
      await editTaskList(data, groupId, id);
      onClose();
      reset();
      toast.success("목록이 수정 되었습니다.");
    } catch (error) {
      toast.error("목록 수정에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const ModalComponent = isMobile ? Drawer : Modal;

  return (
    <ModalComponent
      showCloseButton
      onClose={onClose}
      title="목록을 수정 하실건가요?"
      description={name}
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
            variant="danger"
            className="h-48 w-280"
            Icon={<LoadingSpinner width={30} height={30} />}
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
