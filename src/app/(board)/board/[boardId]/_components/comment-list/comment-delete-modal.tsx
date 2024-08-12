"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { Button, Drawer, FloatButton, Modal } from "@/components/common";
import { useIsMobile, useToast } from "@/hooks";
import deleteBoardComment from "@/lib/api/board-comment/delete-comment";
import { LoadingSpinner } from "@/public/assets/icons";

interface CommentDeleteModalProps {
  onClose: () => void;
  commentId: number;
}

const CommentDeleteModal = ({
  onClose,
  commentId,
}: CommentDeleteModalProps) => {
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const boardId = useMemo(() => pathname.split("/")[2], [pathname]);

  const isMobile = useIsMobile();
  const toast = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteBoardComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["board-comment", boardId],
      });
      toast.success("댓글이 삭제되었습니다.");
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
      onClose();
    },
  });

  const handleClickDelete = () => {
    mutate();
  };

  const CommonComponent = isMobile ? Drawer : Modal;

  return (
    <CommonComponent
      showWarningIcon
      description="삭제한 댓글은 복구할 수 없습니다"
      onClose={onClose}
      title="댓글 삭제"
    >
      <div className="flex gap-8">
        <Button
          disabled={isPending}
          onClick={onClose}
          variant="secondary"
          className="h-48 w-136"
        >
          닫기
        </Button>
        {isPending ? (
          <FloatButton
            Icon={<LoadingSpinner width={30} height={30} />}
            disabled={isPending}
            onClick={handleClickDelete}
            variant="danger"
            className="h-48 w-136"
          >
            삭제중
          </FloatButton>
        ) : (
          <Button
            onClick={handleClickDelete}
            variant="danger"
            className="h-48 w-136"
          >
            삭제
          </Button>
        )}
      </div>
    </CommonComponent>
  );
};

export default CommentDeleteModal;
