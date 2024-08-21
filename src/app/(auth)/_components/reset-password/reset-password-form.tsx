"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, FieldWrapper, FloatButton, Input } from "@/components/common";
import { useIsMobile, useToast } from "@/hooks";
import ResetPassword from "@/lib/api/reset-password/reset-password";
import { resetPasswordSchema } from "@/lib/schemas/auth";
import { LoadingSpinner } from "@/public/assets/icons";
import { pwLengthAtom } from "@/stores";
import { ResetPasswordInput } from "@/types/auth";

const ResetPasswordForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();
  const { success, error } = useToast();
  const [, setPwLength] = useAtom(pwLengthAtom);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<ResetPasswordInput> = async ({
    passwordConfirmation,
    password,
  }) => {
    setIsLoading(true);
    const passwordLength = password.length;

    try {
      const token = new URLSearchParams(window.location.search).get("token");

      if (!token) {
        throw new Error("유효하지 않은 요청입니다.");
      }

      const { success: apiSuccess, data } = await ResetPassword(
        passwordConfirmation,
        password,
        token,
      );

      if (apiSuccess) {
        success("비밀번호가 변경되었습니다.");
        setPwLength(passwordLength);
        router.push("/login");
      } else {
        error(data.message);
      }
    } finally {
      setIsLoading(false);
    }
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
      {isLoading ? (
        <FloatButton
          Icon={<LoadingSpinner width={30} height={30} />}
          disabled
          variant="primary"
          className="mt-40 h-47 w-full"
        >
          처리 중...
        </FloatButton>
      ) : (
        <Button
          type="submit"
          variant="primary"
          disabled={!isValid}
          className="mt-40 h-47 w-full"
        >
          재설정
        </Button>
      )}
    </form>
  );
};

export default ResetPasswordForm;
