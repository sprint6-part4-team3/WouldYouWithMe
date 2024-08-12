"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, FieldWrapper, Input } from "@/components/common";
import { useIsMobile } from "@/hooks";
import { resetPasswordSchema } from "@/lib/schemas/auth";
import { ResetPasswordInput } from "@/types/auth";

const ResetPasswordForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isMobile = useIsMobile();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  // NOTE - api 작업 대신 넣었습니다.
  const onSubmit: SubmitHandler<ResetPasswordInput> = async (data) => {
    setIsLoading(true);

    setTimeout(() => {
      const success = true;
      if (success) {
        if (isMobile) {
          setIsDrawerOpen(true);
        } else {
          setIsModalOpen(true);
        }
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-80 w-315 md:w-470">
      <h1 className="mb-80 flex justify-center text-24 font-medium text-text-primary lg:text-40">
        비밀번호 재설정
      </h1>
      <FieldWrapper
        id="newpassword"
        label="새 비밀번호"
        errorMessage={errors.password?.message || ""}
      >
        <Input
          id="newpassword"
          type="password"
          placeholder={
            isMobile
              ? "비밀번호를 입력해주세요"
              : "비밀번호(영문, 숫자, 특수문자 포함, 최소 8자)를 입력해주세요."
          }
          {...register("password")}
          isError={!!errors.password}
        />
      </FieldWrapper>
      <div className="mt-24">
        <FieldWrapper
          id="passwordConfirmation"
          label="비밀번호 확인"
          errorMessage={errors.passwordConfirmation?.message || ""}
        >
          <Input
            id="passwordConfirmation"
            type="password"
            placeholder="새 비밀번호를 다시 한 번 입력해주세요"
            {...register("passwordConfirmation")}
            isError={!!errors.passwordConfirmation}
          />
        </FieldWrapper>
      </div>
      <Button
        variant="primary"
        type="submit"
        className="mt-40 h-47 w-full"
        disabled={!isValid || isLoading}
      >
        재설정
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
