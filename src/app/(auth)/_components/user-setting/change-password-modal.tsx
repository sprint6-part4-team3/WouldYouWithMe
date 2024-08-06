/* eslint-disable no-console */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, FieldWrapper, Input, Modal } from "@/components/common";
import { changePasswordSchema } from "@/lib/schemas/auth";
import { ChangePasswordInput } from "@/types/auth";

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal = ({ isOpen, onClose }: ResetPasswordModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  // NOTE - api 작업 대신 넣었습니다.
  const onSubmit: SubmitHandler<ChangePasswordInput> = async ({
    newPassword,
    newPasswordConfirmation,
  }) => {
    setIsLoading(true);

    setTimeout(() => {
      const success = true;

      if (success) {
        console.log("성공");
      } else {
        console.log("실패");
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    isOpen && (
      <Modal onClose={onClose} title="비밀번호 변경하기" description="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldWrapper
            id="newPassword"
            label="새 비밀번호"
            errorMessage={errors.newPassword?.message || ""}
          >
            <Input
              id="newPassword"
              type="password"
              placeholder="새 비밀번호를 입력하세요."
              {...register("newPassword")}
              isError={!!errors.newPassword}
            />
          </FieldWrapper>
          <div className="mt-16">
            <FieldWrapper
              id="newPasswordConfirmation"
              label="새 비밀번호 확인"
              errorMessage={errors.newPasswordConfirmation?.message || ""}
            >
              <Input
                id="newPasswordConfirmation"
                type="password"
                placeholder="새 비밀번호를 다시 입력하세요."
                {...register("newPasswordConfirmation")}
                isError={!!errors.newPasswordConfirmation}
              />
            </FieldWrapper>
          </div>
          <div className="mt-24 flex gap-8">
            <Button
              onClick={onClose}
              variant="secondary"
              className="mt-15 h-48 w-136"
            >
              닫기
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!isValid || isLoading}
              className="mt-15 h-48 w-136"
            >
              {isLoading ? "처리 중..." : "변경하기"}
            </Button>
          </div>
        </form>
      </Modal>
    )
  );
};

export default ChangePasswordModal;
