/* eslint-disable no-console */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { useToast } from "@/hooks";
import editBoard from "@/lib/api/board/edit-board";
import boardAddEditSchema from "@/lib/schemas/board";
import {
  BoardAddEditInput,
  BoardCreateEditRequest,
} from "@/types/board/add-edit";

import ContentInput from "../../../_components/content-input";
import BoardFormHeader from "../../../_components/form-header";
import ImageInput from "../../../_components/image-input";
import TitleInput from "../../../_components/title-input";
import TokenInput from "../../../_components/token-input";

interface EditBoardFormProps {
  initialData: BoardAddEditInput;
  boardId: number;
}

const EditBoardForm = ({ initialData, boardId }: EditBoardFormProps) => {
  const toast = useToast();
  const router = useRouter();

  const methods = useForm<BoardAddEditInput>({
    resolver: zodResolver(boardAddEditSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: initialData,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: BoardCreateEditRequest) => editBoard(data, boardId),
  });

  const handleSubmitBoard: SubmitHandler<BoardAddEditInput> = (data) => {
    const contentString = JSON.stringify(data.content);

    const submitData = {
      ...data,
      content: contentString,
    };

    mutate(submitData, {
      onSuccess: (res) => {
        toast.success("게시물이 수정되었습니다.");
        router.replace(`/board/${res.id}`);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmitBoard)}
        className="my-40"
      >
        <BoardFormHeader isPending={isPending} type="edit" />
        <div className="flex flex-col gap-40">
          <TitleInput />
          <TokenInput />
          <ContentInput />
          <ImageInput />
        </div>
      </form>
    </FormProvider>
  );
};

export default EditBoardForm;
