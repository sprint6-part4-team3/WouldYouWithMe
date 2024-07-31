/* eslint-disable no-console */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, FieldWrapper, Input } from "@/components/common";
import { signUpSchema } from "@/lib/schemas/auth";
import { ImgGoogle, ImgKakao } from "@/public/assets/images";
import { SignUpInput } from "@/types/auth";

import signUp from "../signup/action";

const SignUpForm: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<SignUpInput> = async (data) => {
    const { email, nickname, password, passwordConfirmation } = data;
    const resData = await signUp(
      email,
      nickname,
      password,
      passwordConfirmation,
    );

    if (!resData.success) {
      console.error("회원가입 실패:", resData.data?.message);

      if (resData.data?.details?.email) {
        setError("email", {
          type: "manual",
          message: resData.data.details.email.message,
        });
      }

      if (resData.data?.details?.nickname) {
        setError("nickname", {
          type: "manual",
          message: resData.data.details.nickname.message,
        });
      }
    } else {
      console.log("회원가입 성공");
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-80 w-350 md:w-450">
      <p className="mb-80 flex justify-center text-24 font-medium text-text-primary lg:text-40">
        회원가입
      </p>
      <FieldWrapper
        id="nickname"
        label="닉네임"
        errorMessage={errors.nickname?.message || ""}
      >
        <Input
          id="nickname"
          type="text"
          placeholder="닉네임을 입력해주세요"
          {...register("nickname")}
          isError={!!errors.nickname}
        />
      </FieldWrapper>
      <div className="mt-24">
        <FieldWrapper
          id="email"
          label="이메일"
          errorMessage={errors.email?.message || ""}
        >
          <Input
            id="email"
            type="text"
            placeholder="이메일을 입력해주세요"
            {...register("email")}
            isError={!!errors.email}
          />
        </FieldWrapper>
      </div>
      <div className="mt-24">
        <FieldWrapper
          id="password"
          label="비밀번호"
          errorMessage={errors.password?.message || ""}
        >
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            {...register("password")}
            isError={!!errors.password}
          />
        </FieldWrapper>
      </div>
      <div className="mt-24">
        <FieldWrapper
          id="passwordConfirmation"
          label="비밀번호 확인"
          errorMessage={errors.passwordConfirmation?.message || ""}
        >
          <Input
            id="passwordConfirmation"
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            {...register("passwordConfirmation")}
            isError={!!errors.passwordConfirmation}
          />
        </FieldWrapper>
      </div>
      <Button
        variant="primary"
        type="submit"
        className="mt-40 h-47 w-full"
        disabled={!isValid}
      >
        회원가입
      </Button>
      <div className="mt-48 flex w-full items-center">
        <hr className="flex-1 border-t border-border-primary" />
        <span className="mx-24 text-16-400">OR</span>
        <hr className="flex-1 border-t border-border-primary" />
      </div>
      <div className="mt-16 flex w-full justify-between">
        <p className="text-16-500">간편 회원가입하기</p>
        <div className="flex gap-4">
          <button
            type="button"
            className="flex size-42 items-center justify-center rounded"
          >
            <Image src={ImgGoogle} alt="Google" />
          </button>
          <button
            type="button"
            className="ml-16 flex size-42 items-center justify-center rounded"
          >
            <Image src={ImgKakao} alt="Kakao" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
