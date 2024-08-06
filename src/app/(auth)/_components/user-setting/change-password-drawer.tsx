/* eslint-disable no-console */

"use client";

import { useState } from "react";

import { Button, Drawer } from "@/components/common";

interface ChangePasswordDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordDrawer = ({
  isOpen,
  onClose,
}: ChangePasswordDrawerProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    isOpen && (
      <Drawer
        onClose={onClose}
        title="회원 탈퇴"
        description="ㅁㄴㅇㅁㄴ어ㅓ."
        showCloseButton
        showWarningIcon
      >
        <Button variant="secondary" onClick={onClose}>
          닫기
        </Button>
        <Button type="submit" variant="danger" disabled={isLoading}>
          {isLoading ? "처리 중..." : "회원 탈퇴"}
        </Button>
      </Drawer>
    )
  );
};

export default ChangePasswordDrawer;
