/* eslint-disable no-console */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import {
  BoardFormHeader,
  ContentInput,
  ImageInput,
  TitleInput,
  TokenInput,
} from "@/app/(board-management)/_components";
import { useToast } from "@/hooks";
import editBoard from "@/lib/api/board/edit-board";
import boardAddEditSchema from "@/lib/schemas/board";
import {
  BoardAddEditInput,
  BoardCreateEditRequest,
} from "@/types/board/add-edit";

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
    reValidateMode: "onBlur",
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
        router.replace(`/board/${res.id}`);
        toast.success("게시물이 수정되었습니다.");
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
