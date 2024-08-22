"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, FloatButton, TextArea } from "@/components/common";
import { useToast } from "@/hooks";
import createBoardComment from "@/lib/api/board-comment/create-comment";
import { LoadingSpinner } from "@/public/assets/icons";
import userAtom from "@/stores/user-atom";
import { BoardCommentInput, BoardCommentResponse } from "@/types/board/comment";

interface AddCommentProps {
  boardId: number;
  setSampleComment: (value: BoardCommentResponse | null) => void;
}

const AddComment = ({ boardId, setSampleComment }: AddCommentProps) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [user] = useAtom(userAtom);
  const router = useRouter();

  const isLogin = useMemo(() => user.id !== 0, [user]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid },
  } = useForm<BoardCommentInput>();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: BoardCommentInput) => createBoardComment(boardId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["board-comment", boardId],
      });
    },
  });

  const handleSubmitComment: SubmitHandler<BoardCommentInput> = (data) => {
    if (!isLogin) {
      toast.error("로그인 후 이용해주세요");
      router.push("/login");
    } else {
      const submitData = { content: data.content.trim() };

      const sampleComment = {
        writer: { image: user.image, nickname: user.nickname, id: user.id },
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        content: submitData.content,
        id: 10000,
      };

      setSampleComment(sampleComment);

      mutate(submitData, {
        onSuccess: () => {
          reset();
        },
        onError: (error) => {
          toast.error(error.message);
          setSampleComment(null);
        },
      });
    }
  };

  return (
    <section className="flex flex-col">
      <h2 className="text-16-700 md:text-20-700">댓글달기</h2>

      <form
        onSubmit={handleSubmit(handleSubmitComment)}
        className="mt-16 flex flex-col gap-16 md:mt-24"
      >
        <TextArea
          {...register("content", {
            required: true,
          })}
          id="comment"
          rows={4}
          placeholder="댓글을 입력해주세요."
        />

        {isPending ? (
          <FloatButton
            Icon={<LoadingSpinner width={30} height={30} />}
            type="submit"
            disabled
            variant="primary"
            className="h-35 w-82 self-end md:h-48 md:w-184"
          >
            등록중
          </FloatButton>
        ) : (
          <Button
            type="submit"
            className="h-35 w-82 self-end md:h-48 md:w-184"
            variant="primary"
            disabled={!isValid}
          >
            등록
          </Button>
        )}
      </form>

      <div className="my-40 h-1 w-full bg-border-primary/10" />
    </section>
  );
};

export default AddComment;
