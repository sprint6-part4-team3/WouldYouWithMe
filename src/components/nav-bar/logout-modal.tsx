"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button, Modal } from "@/components/common";
import { useToast } from "@/hooks";
import { deleteCookie } from "@/utils/next-cookie";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal = ({ isOpen, onClose }: LogoutModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { success, error } = useToast();
  const router = useRouter();

  const queryClient = useQueryClient();

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      await deleteCookie("token");
      await deleteCookie("refreshToken");
      await deleteCookie("userId");
      await deleteCookie("userNickname");
      success("로그아웃 성공");

      queryClient.invalidateQueries({ queryKey: ["userData"] });

      router.push("/");
    } catch (err) {
      error("로그아웃 실패");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    isOpen && (
      <Modal
        onClose={onClose}
        title="로그아웃 하시겠어요?"
        className="h-171 w-384"
      >
        <div className="flex gap-8">
          <Button variant="secondary" onClick={onClose} className="h-48 w-136">
            닫기
          </Button>
          <Button
            type="submit"
            variant="danger"
            disabled={isLoading}
            className="h-48 w-136"
            onClick={onSubmit}
          >
            {isLoading ? "처리 중..." : "로그아웃"}
          </Button>
        </div>
      </Modal>
    )
  );
};

export default LogoutModal;
