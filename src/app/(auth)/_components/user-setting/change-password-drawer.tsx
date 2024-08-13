"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, Drawer, FieldWrapper, Input } from "@/components/common";
import { useToast } from "@/hooks";
import ChangePassword from "@/lib/api/user-setting/change-password";
import { resetPasswordSchema } from "@/lib/schemas/auth";
import { ChangePasswordInput } from "@/types/auth";

interface ChangePasswordDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordDrawer = ({
  isOpen,
  onClose,
}: ChangePasswordDrawerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { success, error } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const { mutate } = useMutation({
    mutationFn: (data: { passwordConfirmation: string; password: string }) =>
      ChangePassword(data),
  });

  const onSubmit: SubmitHandler<ChangePasswordInput> = (data) => {
    setIsLoading(true);

    const { passwordConfirmation, password } = data;

    mutate(
      { passwordConfirmation, password },
      {
        onSuccess: () => {
          success("비밀번호가 변경되었습니다.");
          router.replace(`/user-setting`);
          setIsLoading(false);
          onClose();
        },
        onError: () => {
          error("비밀번호 변경에 실패했습니다.");
          setIsLoading(false);
        },
      },
    );
  };

  return (
    isOpen && (
      <Drawer onClose={onClose} title="비밀번호 변경하기" description="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldWrapper
            id="password"
            label="새 비밀번호"
            errorMessage={errors.password?.message || ""}
          >
            <Input
              id="password"
              type="password"
              placeholder="새 비밀번호를 입력하세요."
              {...register("password")}
              isError={!!errors.password}
            />
          </FieldWrapper>
          <div className="mt-16">
            <FieldWrapper
              id="passwordConfirmation"
              label="새 비밀번호 확인"
              errorMessage={errors.passwordConfirmation?.message || ""}
            >
              <Input
                id="passwordConfirmation"
                type="password"
                placeholder="새 비밀번호를 다시 입력하세요."
                {...register("passwordConfirmation")}
                isError={!!errors.passwordConfirmation}
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
      </Drawer>
    )
  );
};

export default ChangePasswordDrawer;
