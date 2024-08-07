"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { Button, FieldWrapper, FloatButton, Input } from "@/components/common";
import { useIsMobile } from "@/hooks";
import { IconSecession } from "@/public/assets/icons";
import { UserSettingInput } from "@/types/auth";

import CancelUserDrawer from "./cancel-user-drawer";
import CancelUserModal from "./cancel-user-modal";
import ChangePasswordDrawer from "./change-password-drawer";
import ChangePasswordModal from "./change-password-modal";

const PasswordInput = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<UserSettingInput>();

  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [isChangeDrawerOpen, setIsChangeDrawerOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelDrawerOpen, setIsCancelDrawerOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleChangePasswordClick = () => {
    if (isMobile) {
      setIsChangeDrawerOpen(true);
    } else {
      setIsChangeModalOpen(true);
    }
  };

  const handleCancelUserClick = () => {
    if (isMobile) {
      setIsCancelDrawerOpen(true);
    } else {
      setIsCancelModalOpen(true);
    }
  };

  return (
    <FieldWrapper
      label="비밀번호"
      id="password"
      errorMessage={errors.password?.message || ""}
    >
      <div className="relative">
        <Input
          {...register("password")}
          id="password"
          placeholder="비밀번호를 입력해주세요"
          isError={!!errors.password}
          value={watch("password")}
        />
        <Button
          variant="primary"
          className="absolute right-16 top-9 z-[5] h-32 w-74"
          onClick={handleChangePasswordClick}
        >
          변경하기
        </Button>
        {isMobile ? (
          <ChangePasswordDrawer
            isOpen={isChangeDrawerOpen}
            onClose={() => setIsChangeDrawerOpen(false)}
          />
        ) : (
          <ChangePasswordModal
            isOpen={isChangeModalOpen}
            onClose={() => setIsChangeModalOpen(false)}
          />
        )}
        <FloatButton
          variant="cancel"
          Icon={<IconSecession />}
          className="absolute top-80"
          onClick={handleCancelUserClick}
        >
          회원 탈퇴하기
        </FloatButton>
        {isMobile ? (
          <CancelUserDrawer
            isOpen={isCancelDrawerOpen}
            onClose={() => setIsCancelDrawerOpen(false)}
          />
        ) : (
          <CancelUserModal
            isOpen={isCancelModalOpen}
            onClose={() => setIsCancelModalOpen(false)}
          />
        )}
      </div>
    </FieldWrapper>
  );
};

export default PasswordInput;
