"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button, Drawer, FloatButton, Modal } from "@/components/common";
import { useIsMobile, useToast } from "@/hooks";
import { LoadingSpinner } from "@/public/assets/icons";
import { pwLengthAtom, userAtom } from "@/stores";
import { deleteCookie } from "@/utils/next-cookie";

interface LogoutComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY_PREFIX = "comment_draft_";

const LogoutComponent = ({ isOpen, onClose }: LogoutComponentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { success, error } = useToast();
  const router = useRouter();
  const isMobile = useIsMobile();

  const [, setUser] = useAtom(userAtom);
  const [, setPwLength] = useAtom(pwLengthAtom);

  const CommonLogout = isMobile ? Drawer : Modal;

  const queryClient = useQueryClient();

  const clearCommentDrafts = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(STORAGE_KEY_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  };

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      await deleteCookie("token");
      await deleteCookie("refreshToken");
      await deleteCookie("userId");
      await deleteCookie("firstTeamName");

      // Clear comment drafts from local storage
      clearCommentDrafts();

      success("로그아웃 성공");

      queryClient.invalidateQueries({ queryKey: ["userData"] });

      setUser({
        id: 0,
        nickname: "",
        createdAt: "",
        updatedAt: "",
        image: null,
        teamId: "",
        email: "",
        accessToken: "",
        refreshToken: "",
        loginType: null,
      });
      setPwLength(0);

      window.location.href = "/";
    } catch (err) {
      error("로그아웃 실패");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    isOpen && (
      <CommonLogout
        onClose={onClose}
        title="로그아웃 하시겠어요?"
        className="h-171 w-384"
      >
        <div className="flex gap-8">
          <Button variant="secondary" onClick={onClose} className="h-48 w-136">
            닫기
          </Button>
          {isLoading ? (
            <FloatButton
              Icon={<LoadingSpinner width={30} height={30} />}
              disabled={isLoading}
              variant="danger"
              className="h-48 w-136"
            >
              처리 중...
            </FloatButton>
          ) : (
            <Button onClick={onSubmit} variant="danger" className="h-48 w-136">
              로그아웃
            </Button>
          )}
        </div>
      </CommonLogout>
    )
  );
};

export default LogoutComponent;
