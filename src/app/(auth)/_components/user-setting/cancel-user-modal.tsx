/* eslint-disable no-console */

"use client";

import { useState } from "react";

import { Button, Modal } from "@/components/common";

interface CancelUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CancelUserModal = ({ isOpen, onClose }: CancelUserModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

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
            disabled={isLoading}
            className="h-48 w-136"
          >
            {isLoading ? "처리 중..." : "회원 탈퇴"}
          </Button>
        </div>
      </Modal>
    )
  );
};

export default CancelUserModal;
