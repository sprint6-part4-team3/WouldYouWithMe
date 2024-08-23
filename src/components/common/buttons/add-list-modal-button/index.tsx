"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/common/buttons/button";
import Drawer from "@/components/common/drawer";
import Input from "@/components/common/forms/input";
import Modal from "@/components/common/modal";
import { useIsMobile, useToast, useToggle } from "@/hooks";
import createTaskList from "@/lib/api/task-list/create-task-list";
import taskListAddEditSchema from "@/lib/schemas/task-list";
import { IconPlusCurrent, LoadingSpinner } from "@/public/assets/icons";
import { GroupTask } from "@/types/group";
import { TaskListAddEditInput } from "@/types/task-list";

import ErrorMessage from "../../forms/error-message";
import FloatButton from "../float-button";

/**
 * 새로운 목록 추가하기 버튼
 * 목록 만들기 모달 띄우는 버튼입니다.
 */

type AddListModalButtonProps = {
  groupId: number;
  onAddTask?: () => void;
};

type TaskListNav = { id: number; name: string }[];

const AddListModalButton = ({
  groupId,
  onAddTask,
}: AddListModalButtonProps) => {
  const { value, handleOn, handleOff } = useToggle();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<TaskListAddEditInput>({
    resolver: zodResolver(taskListAddEditSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const createList = async (data: TaskListAddEditInput) => {
    setIsLoading(true);
    try {
      const createdTask = await createTaskList(data, groupId);
      toast.success("등록이 완료되었습니다");
      if (onAddTask) {
        onAddTask();
      }
      const taskListsNav = { id: createdTask.id, name: data.name };
      queryClient.setQueryData(
        ["task-lists", createdTask.groupId],
        (oldData: TaskListNav) => {
          if (!oldData) {
            return [taskListsNav];
          }
          return [...oldData, taskListsNav];
        },
      );
      sessionStorage.setItem(
        `task-lists-${createdTask.groupId}`,
        JSON.stringify(taskListsNav),
      );
      handleOff();
      reset();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error("서버에서 에러가 발생했습니다");
        }
      } else {
        const errorMessage =
          (error as Error).message || "알 수 없는 에러가 발생했습니다";
        toast.error(errorMessage);
      }
    } finally {
      reset();
      setIsLoading(false);
    }
  };

  const ModalComponent = isMobile ? Drawer : Modal;
  const description = (
    <>
      할 일에 대한 목록을 추가하고
      <br />
      목록별 할 일을 만들 수 있습니다.
    </>
  );

  return (
    <>
      <button
        onClick={handleOn}
        type="button"
        className="group flex items-center gap-4 text-14-400 text-brand-primary hover:text-interaction-hover"
      >
        <IconPlusCurrent className="stroke-brand-primary group-hover:stroke-interaction-hover" />
        새로운 목록 추가하기
      </button>
      {value && (
        <ModalComponent
          showCloseButton
          onClose={handleOff}
          title="새로운 목록 추가"
          description={description}
        >
          <form
            className="flex flex-col gap-16"
            onSubmit={handleSubmit(createList)}
          >
            <Input
              {...register("name")}
              id="create-list"
              placeholder="목록 명을 입력해주세요."
              isError={!!errors.name}
            />
            <ErrorMessage message={errors.name?.message} />
            {isLoading ? (
              <FloatButton
                variant="primary"
                className="h-48 w-full"
                Icon={<LoadingSpinner width={30} height={30} />}
                disabled={!isValid || isLoading}
              >
                목록 생성 중...
              </FloatButton>
            ) : (
              <Button
                variant="primary"
                className="h-48 w-full"
                type="submit"
                disabled={!isValid}
              >
                만들기
              </Button>
            )}
          </form>
        </ModalComponent>
      )}
    </>
  );
};

export default AddListModalButton;
