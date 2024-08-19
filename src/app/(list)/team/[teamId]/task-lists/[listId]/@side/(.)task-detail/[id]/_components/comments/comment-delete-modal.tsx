import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button, Drawer, FloatButton, Modal } from "@/components/common";
import { useIsMobile, useToast } from "@/hooks";
import deleteComment from "@/lib/api/task-comments/delete-comments";
import { LoadingSpinner } from "@/public/assets/icons";

const CommentDeleteModal = ({
  onClose,
  commentId,
  taskId,
  onDeleteSuccess,
}: {
  onClose: () => void;
  commentId: number;
  taskId: number;
  onDeleteSuccess: (commentId: number) => void;
}) => {
  const isMobile = useIsMobile();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteComment(taskId, commentId),
    onSuccess: () => {
      toast.success("댓글이 삭제되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["comments", taskId],
      });
      onDeleteSuccess(commentId);
      onClose();
    },
    onError: (error: Error) => {
      toast.error(`댓글 삭제 실패: ${error.message}`);
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
          취소
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
