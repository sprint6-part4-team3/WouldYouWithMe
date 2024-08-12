"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, FloatButton, TextArea } from "@/components/common";
import { useToast } from "@/hooks";
import createBoardComment from "@/lib/api/board-comment/create-comment";
import { LoadingSpinner } from "@/public/assets/icons";
import { BoardCommentInput } from "@/types/board/comment";

const AddComment = ({ boardId }: { boardId: number }) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid },
  } = useForm<BoardCommentInput>();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: BoardCommentInput) => createBoardComment(boardId, data),
  });

  const handleSubmitComment: SubmitHandler<BoardCommentInput> = (data) => {
    const submitData = { content: data.content.trim() };

    mutate(submitData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["comment", boardId],
        });
        toast.success("댓글이 작성되었습니다.");
        reset();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
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
            className="h-32 w-74 self-end text-14 md:h-48 md:w-184 md:text-16"
          >
            등록중
          </FloatButton>
        ) : (
          <Button
            type="submit"
            className="h-32 w-74 self-end text-14 md:h-48 md:w-184 md:text-16"
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
