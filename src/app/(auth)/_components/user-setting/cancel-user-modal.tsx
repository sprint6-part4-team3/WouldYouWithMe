"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { Button, Modal } from "@/components/common";
import { useToast } from "@/hooks";
import CancelUser from "@/lib/api/user-setting/cancel-user";
import { deleteCookie } from "@/utils/next-cookie";

interface CancelUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CancelUserModal = ({ isOpen, onClose }: CancelUserModalProps) => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await CancelUser();

      if (response.success) {
        await deleteCookie("token");
        await deleteCookie("refreshToken");
        await deleteCookie("userId");
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      success("회원 탈퇴되었습니다.");
      router.replace(`/`);
      onClose();
    },
    onError: () => {
      error("회원 탈퇴에 실패했습니다.");
      onClose();
    },
  });

  const onSubmit = () => {
    mutate();
  };

  return (
    isOpen && (
      <Modal
        onClose={onClose}
        title="회원 탈퇴를 진행하시겠어요?"
        description="그룹장으로 있는 그룹은 자동으로 삭제되고, 모든 그룹에서 나가집니다."
        showWarningIcon
      >
        <div className="flex gap-8">
          <Button variant="secondary" onClick={onClose} className="h-48 w-136">
            닫기
          </Button>
          <Button
            type="submit"
            variant="danger"
            disabled={isPending}
            className="h-48 w-136"
            onClick={onSubmit}
          >
            {isPending ? "처리 중..." : "회원 탈퇴"}
          </Button>
        </div>
      </Modal>
    )
  );
};

export default CancelUserModal;
