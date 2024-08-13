"use client";

import { useAtomValue } from "jotai";
import { useState } from "react";

import { Button, FieldWrapper, FloatButton, Input } from "@/components/common";
import { useIsMobile } from "@/hooks";
import { IconSecession } from "@/public/assets/icons";
import pwLengthAtom from "@/stores/pw-length-atom";

import CancelUserDrawer from "./cancel-user-drawer";
import CancelUserModal from "./cancel-user-modal";
import ChangePasswordDrawer from "./change-password-drawer";
import ChangePasswordModal from "./change-password-modal";

const PasswordInput = () => {
  const [isChangeOpen, setIsChangeOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const isMobile = useIsMobile();

  const passwordLength = useAtomValue(pwLengthAtom) || 0;
  const defaultPassword = "•".repeat(passwordLength);

  const CommonChangeComponent = isMobile
    ? ChangePasswordDrawer
    : ChangePasswordModal;
  const CommonCancelComponent = isMobile ? CancelUserDrawer : CancelUserModal;

  const handleChangePasswordClick = () => {
    setIsChangeOpen(true);
  };

  const handleCancelUserClick = () => {
    setIsCancelOpen(true);
  };

  return (
    <FieldWrapper label="비밀번호" id="password">
      <div className="relative">
        <Input
          id="password"
          placeholder=""
          value={defaultPassword}
          readOnly
          className="w-full rounded-xl bg-background-tertiary px-16 py-15 text-16-500 text-text-primary  outline-none ring-1 transition-all duration-300"
        />
        <Button
          variant="primary"
          className="absolute right-16 top-9 z-[5] h-32 w-74"
          onClick={handleChangePasswordClick}
        >
          변경하기
        </Button>
        <CommonChangeComponent
          isOpen={isChangeOpen}
          onClose={() => setIsChangeOpen(false)}
        />
        <FloatButton
          variant="cancel"
          Icon={<IconSecession />}
          className="absolute top-80"
          onClick={handleCancelUserClick}
        >
          회원 탈퇴하기
        </FloatButton>
        <CommonCancelComponent
          isOpen={isCancelOpen}
          onClose={() => setIsCancelOpen(false)}
        />
      </div>
    </FieldWrapper>
  );
};

export default PasswordInput;
