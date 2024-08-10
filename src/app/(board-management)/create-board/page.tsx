"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
import createBoard from "@/lib/api/board/create-board";
import boardAddEditSchema from "@/lib/schemas/board";
import {
  BoardAddEditInput,
  BoardCreateEditRequest,
} from "@/types/board/add-edit";

const CreateBoardPage = () => {
  const toast = useToast();
  const router = useRouter();

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

  const { mutate, isPending } = useMutation({
    mutationFn: (data: BoardCreateEditRequest) => createBoard(data),
  });

  const handleSubmitBoard: SubmitHandler<BoardAddEditInput> = (data) => {
    const contentString = JSON.stringify(data.content);

    const submitData = {
      ...data,
      content: contentString,
    };

    mutate(submitData, {
      onSuccess: (res) => {
        toast.success("게시물이 작성되었습니다.");
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
        <BoardFormHeader type="write" isPending={isPending} />
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

export default CreateBoardPage;
