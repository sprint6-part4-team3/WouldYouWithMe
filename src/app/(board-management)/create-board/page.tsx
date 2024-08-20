"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
import createBoard from "@/lib/api/board/create-board";
import boardAddEditSchema from "@/lib/schemas/board";
import {
  BoardAddEditInput,
  BoardCreateEditRequest,
} from "@/types/board/add-edit";

const CreateBoardPage = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const router = useRouter();

  const [isImgLoading, setIsImgLoading] = useState(false);

  const methods = useForm<BoardAddEditInput>({
    resolver: zodResolver(boardAddEditSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      title: "",
      content: {
        content: "",
        token: "",
      },
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: BoardCreateEditRequest) => createBoard(data),
    onSuccess: () => {
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
        router.push(`/board/${res.id}`);
        toast.success("게시물이 작성되었습니다.");
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
          type="write"
          isImgLoading={isImgLoading}
          isPending={isPending || isSuccess}
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

export default CreateBoardPage;
