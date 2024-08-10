"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";

import Button from "@/components/common/buttons/button";
import Drawer from "@/components/common/drawer";
import Input from "@/components/common/forms/input";
import Modal from "@/components/common/modal";
import { useIsMobile, useToast, useToggle } from "@/hooks";
import createTaskList from "@/lib/api/tast-list/create-tast-list";
import taskListAddEditSchema from "@/lib/schemas/task-list";
import { IconPlusCurrent } from "@/public/assets/icons";
import { TaskListAddEditInput } from "@/types/task-list";

/**
 * 새로운 목록 추가하기 버튼
 * 목록 만들기 모달 띄우는 버튼입니다.
 * @example
 *  <AddListModalButton />
 * @author ☯️채종민
 */

type AddListModalButtonProps = {
  groupId: number;
};

const AddListModalButton = ({ groupId }: AddListModalButtonProps) => {
  const { value, handleOn, handleOff } = useToggle();
  const toast = useToast();
  const isMobile = useIsMobile();

  const { register, handleSubmit, reset } = useForm<TaskListAddEditInput>({
    resolver: zodResolver(taskListAddEditSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const createList = async (data: TaskListAddEditInput) => {
    try {
      await createTaskList(data, groupId);
      toast.success("등록이 완료되었습니다");
      handleOff();
      reset();
    } catch (error) {
      let errorMessage = "목록 생성 중 문제가 발생했습니다";
      // 서버에서 처리된 에러 메시지 확인
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          // 서버 응답에서 에러 메시지 추출
          errorMessage =
            error.response.data.message || "서버에서 에러가 발생했습니다";
        }
      }
      toast.error(errorMessage);
    }
  };

  const ModalComponent = isMobile ? Drawer : Modal;

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
        <ModalComponent showCloseButton onClose={handleOff} title="할 일 목록">
          <form
            className="flex flex-col gap-16"
            onSubmit={handleSubmit(createList)}
          >
            <Input
              {...register("name")}
              id="create-list"
              placeholder="목록을 입력해주세요"
            />
            <Button variant="primary" className="h-48 w-full" type="submit">
              만들기
            </Button>
          </form>
        </ModalComponent>
      )}
    </>
  );
};

export default AddListModalButton;
