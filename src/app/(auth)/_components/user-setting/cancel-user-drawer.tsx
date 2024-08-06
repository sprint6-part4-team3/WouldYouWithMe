/* eslint-disable no-console */

"use client";

import { useState } from "react";

import { Button, Drawer } from "@/components/common";

interface CancelUserDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CancelUserDrawer = ({ isOpen, onClose }: CancelUserDrawerProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // NOTE - api 작업 대신 넣었습니다.
  const onSubmit = async () => {
    setIsLoading(true);

    setTimeout(() => {
      const success = true;

      if (success) {
        console.log("회원 탈퇴 성공");
      } else {
        console.log("회원 탈퇴 실패");
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    isOpen && (
      <Drawer
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
            onClick={onSubmit}
          >
            {isLoading ? "처리 중..." : "회원 탈퇴"}
          </Button>
        </div>
      </Drawer>
    )
  );
};

export default CancelUserDrawer;
