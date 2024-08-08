"use client";

import { deleteCookie } from "@/utils/next-cookies";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button, Drawer } from "@/components/common";
import { useToast } from "@/hooks";

interface LogoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutDrawer = ({ isOpen, onClose }: LogoutDrawerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { success, error } = useToast();
  const router = useRouter();

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      await deleteCookie("token");
      await deleteCookie("refreshToken");
      success("로그아웃 성공");
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
      <Drawer
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
      </Drawer>
    )
  );
};

export default LogoutDrawer;
