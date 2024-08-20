/* eslint-disable react-hooks/rules-of-hooks */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
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
import getBoardDetailData from "@/lib/api/board/get-board-detail-data";
import boardAddEditSchema from "@/lib/schemas/board";
import {
  BoardAddEditInput,
  BoardCreateEditRequest,
} from "@/types/board/add-edit";

interface EditBoardFormProps {
  boardId: number;
  userId?: string;
}

const EditBoardForm = ({ boardId, userId }: EditBoardFormProps) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const router = useRouter();

  const [isImgLoading, setIsImgLoading] = useState(false);

  const { data: boardData, error: boardDataError } = useQuery({
    queryKey: ["board", boardId],
    queryFn: () => getBoardDetailData(boardId),
  });

  if (!boardData) {
    return redirect("/error");
  }

  if (boardData.writer.id !== Number(userId)) {
    return redirect("/not-found");
  }

  if (boardDataError) {
    return redirect("/error");
  }

  const parsedContent = JSON.parse(boardData.content);

  const initialData: BoardAddEditInput = {
    title: boardData.title,
    content: {
      content: parsedContent.content,
      token: parsedContent.token,
    },
    ...(boardData.image && { image: boardData.image }),
  };

  const methods = useForm<BoardAddEditInput>({
    resolver: zodResolver(boardAddEditSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: initialData,
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: BoardCreateEditRequest) => editBoard(data, boardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board", boardId] });
      queryClient.invalidateQueries({
        queryKey: ["boardList"],
      });
    },
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
        <BoardFormHeader
          isImgLoading={isImgLoading}
          isPending={isPending || isSuccess}
          type="edit"
        />
        <div className="flex flex-col gap-40">
          <TitleInput />
          <TokenInput />
          <ContentInput />
          <ImageInput setIsImgLoading={setIsImgLoading} />
        </div>
      </form>
    </FormProvider>
  );
};

export default EditBoardForm;
