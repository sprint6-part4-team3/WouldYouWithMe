/* eslint-disable no-console */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, FieldWrapper, Input } from "@/components/common";
import loginSchema from "@/lib/schemas/auth";
import { ImgGoogle, ImgKakao } from "@/public/assets/images";
import { SignInInput } from "@/types/auth";

import signIn from "../login/actions";

const SignInForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<SignInInput> = async (data) => {
    const { email, password } = data;
    const resData = await signIn(email, password);
    if (!resData.success) {
      const message = resData.data?.message;
      console.error("로그인 실패:", message);
    } else {
      console.log("로그인 성공");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-80 w-350 md:w-450">
      <p className="mb-80 flex justify-center text-24 font-medium text-text-primary lg:text-40">
        로그인
      </p>
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
        {/* 비밀번호 재설정 모달 띄우기  */}
        <p className="mt-12 text-right text-16-500 text-brand-primary underline">
          비밀번호를 잊으셨나요?
        </p>
      </div>
      <Button variant="primary" type="submit" className="mt-40 h-47 w-full">
        로그인
      </Button>
      <p className="mt-24">
        아직 계정이 없으신가요?
        <Link href="/signup" className="ml-12 text-brand-primary underline">
          가입하기
        </Link>
      </p>
      <div className="mt-48 flex w-full items-center">
        <hr className="flex-1 border-t border-border-primary" />
        <span className="mx-24 text-16-400">OR</span>
        <hr className="flex-1 border-t border-border-primary" />
      </div>
      <div className="mt-16 flex w-full justify-between">
        <p className=" text-16-500">간편 로그인하기</p>
        {/* 간편 로그인 작업 예정 */}
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

export default SignInForm;
