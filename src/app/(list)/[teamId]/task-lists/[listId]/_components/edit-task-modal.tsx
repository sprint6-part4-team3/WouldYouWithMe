"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  Button,
  Drawer,
  FieldWrapper,
  Input,
  Modal,
} from "@/components/common";
import { useIsMobile, useTaskParams, useToast } from "@/hooks";
import editTaskDetail from "@/lib/api/task-detail/edit-task-detail";
import editTaskSchema from "@/lib/schemas/task/edit-task";
import { EditTaskType } from "@/types/task-list";

interface EditTaskProps {
  id: number;
  name: string;
  closeEditTask: () => void;
}

const EditTaskModal = ({ id, name, closeEditTask }: EditTaskProps) => {
  const { groupId: currentGroupId, taskListId: currentListId } =
    useTaskParams();
  const toast = useToast();
  const router = useRouter();
  const isMobile = useIsMobile();
  const EditTaskComponent = isMobile ? Drawer : Modal;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<EditTaskType>({
    resolver: zodResolver(editTaskSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      name,
    },
  });
  const handleClose = () => {
    closeEditTask();
    reset({
      name,
    });
  };
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      groupId,
      taskListId,
      taskId,
      data,
    }: {
      groupId: number;
      taskListId: number;
      taskId: number;
      data: EditTaskType;
    }) => editTaskDetail(groupId, taskListId, taskId, data),
  });
  const onSubmit: SubmitHandler<EditTaskType> = async (data) => {
    mutate(
      { groupId: currentGroupId, taskListId: currentListId, taskId: id, data },
      {
        onSuccess: () => {
          router.refresh();
          toast.success("수정 되었습니다");
          closeEditTask();
        },
        onError: () => {
          toast.error("수정 실패");
        },
      },
    );
  };
  return (
    <EditTaskComponent onClose={handleClose} title="할 일 수정하기">
      <form className="flex flex-col gap-16" onSubmit={handleSubmit(onSubmit)}>
        <FieldWrapper
          id="name"
          label="제목"
          errorMessage={errors.name?.message}
        >
          <Input
            id="name"
            type="text"
            placeholder="할일 제목을 지어주세요"
            {...register("name")}
            isError={!!errors.name}
          />
        </FieldWrapper>
        <Button
          variant="primary"
          className="h-48 w-full"
          type="submit"
          disabled={!isValid || isPending}
        >
          {isPending ? "수정 중..." : "수정하기"}
        </Button>
      </form>
    </EditTaskComponent>
  );
};

export default EditTaskModal;
