import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, FloatButton, TextArea } from "@/components/common";
import { useToast } from "@/hooks";
import editBoardComment from "@/lib/api/board-comment/edit-comment";
import { LoadingSpinner } from "@/public/assets/icons";
import { BoardCommentInput } from "@/types/board/comment";

interface CommentEditModeProps {
  setIsEditMode: (id: number | null) => void;
  commentId: number;
  comment: string;
}

const CommentEditMode = ({
  setIsEditMode,
  commentId,
  comment,
}: CommentEditModeProps) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const pathname = usePathname();

  const boardId = useMemo(() => pathname.split("/")[2], [pathname]);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<BoardCommentInput>({
    defaultValues: {
      content: comment,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: BoardCommentInput) => editBoardComment(commentId, data),
  });

  const handleEditComment: SubmitHandler<BoardCommentInput> = (data) => {
    const submitData = { content: data.content.trim() };

    mutate(submitData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["board-comment", boardId],
        });
        setIsEditMode(null);
        toast.success("댓글이 수정되었습니다.");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleEditComment)}
        className="flex flex-col gap-12"
      >
        <TextArea
          {...register("content", {
            required: true,
          })}
          rows={4}
          id="content"
          placeholder="수정할 댓글을 입력해주세요"
        />
        <div className="flex justify-end gap-8">
          <Button
            variant="noFill"
            className="h-40 w-60"
            disabled={isPending}
            onClick={() => setIsEditMode(null)}
          >
            취소
          </Button>
          {isPending ? (
            <FloatButton
              Icon={<LoadingSpinner width={20} height={20} />}
              type="submit"
              className="h-40 w-100"
              variant="primary"
              disabled
            >
              수정중
            </FloatButton>
          ) : (
            <Button
              type="submit"
              className="h-40 w-100"
              variant="primary"
              disabled={!isValid}
            >
              수정하기
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CommentEditMode;
