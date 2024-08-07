/* eslint-disable no-console */

"use client";

import { useState } from "react";

import { Button, Modal } from "@/components/common";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutModal = ({ isOpen, onClose }: LogoutModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // NOTE - 로그아웃 api 예정
  const onSubmit = async () => {
    setIsLoading(true);

    setTimeout(() => {
      const success = true;

      if (success) {
        console.log("로그아웃 성공");
      } else {
        console.log("로그아웃 실패");
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    isOpen && (
      <Modal
        onClose={onClose}
        title="로그아웃 하시겠어요?"
        className="h-160 w-310 md:h-171 md:w-384"
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
