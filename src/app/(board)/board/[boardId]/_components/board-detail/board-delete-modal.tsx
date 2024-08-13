"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Button, Drawer, FloatButton, Modal } from "@/components/common";
import { useIsMobile, useToast } from "@/hooks";
import deleteBoard from "@/lib/api/board/delete-board";
import { LoadingSpinner } from "@/public/assets/icons";

interface BoardDeleteModalProps {
  onClose: () => void;
  boardId: number;
}

const BoardDeleteModal = ({ onClose, boardId }: BoardDeleteModalProps) => {
  const isMobile = useIsMobile();
  const toast = useToast();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteBoard(boardId),
    onSuccess: () => {
      toast.success("게시물이 삭제되었습니다.");
      router.replace("/boards");
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
      description="삭제한 게시물은 복구할 수 없습니다"
      onClose={onClose}
      title="게시물 삭제"
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

export default BoardDeleteModal;
