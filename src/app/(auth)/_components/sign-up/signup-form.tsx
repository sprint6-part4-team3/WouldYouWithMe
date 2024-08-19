"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, FieldWrapper, Input } from "@/components/common";
import {
  GOOGLE_AUTHORIZE_URL,
  KAKAO_AUTHORIZE_URL,
} from "@/constants/auth-url";
import { useIsMobile, useToast } from "@/hooks";
import signUp from "@/lib/api/auth/sign-up";
import { signUpSchema } from "@/lib/schemas/auth";
import { ImgGoogle, ImgKakao } from "@/public/assets/images";
import { pwLengthAtom, userAtom } from "@/stores";
import { SignUpInput, SignUpResponseSuccess } from "@/types/auth";
import randomString from "@/utils/random-string";

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const { success, error } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [, setUser] = useAtom(userAtom);
  const [, setPwLength] = useAtom(pwLengthAtom);

  const isMobile = useIsMobile();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<SignUpInput> = async (data) => {
    setIsLoading(true);
    const { email, nickname, password, passwordConfirmation } = data;
    const passwordLength = password.length;

    try {
      const resData = await signUp(
        email,
        nickname,
        password,
        passwordConfirmation,
      );

      if (!resData.success) {
        error(`${resData.data?.message}`);
      } else {
        const { user, accessToken, refreshToken } =
          resData as SignUpResponseSuccess;

        success("회원가입 성공");

        setUser({
          id: user.id,
          nickname: user.nickname,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          image: user.image,
          teamId: user.teamId,
          email: user.email,
          accessToken,
          refreshToken,
          loginType: null,
        });

        setPwLength(passwordLength);

        queryClient.invalidateQueries({ queryKey: ["userData"] });

        router.push("/");
      }
    } catch (err) {
      error("회원가입 요청 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKakaoLogin = () => {
    const state = randomString(10);
    const KAKAO_LOGIN_URL = `${KAKAO_AUTHORIZE_URL}?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&scope=profile_nickname,profile_image&state=${state}`;
    window.location.href = KAKAO_LOGIN_URL;
  };

  const handleGoogleLogin = () => {
    const state = randomString(10);
    const GOOGLE_LOGIN_URL = `${GOOGLE_AUTHORIZE_URL}?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email&state=${state}`;
    window.location.href = GOOGLE_LOGIN_URL;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-80 w-315 md:w-470">
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
            placeholder={
              isMobile
                ? "비밀번호를 입력해주세요"
                : "비밀번호(영문, 숫자, 특수문자 포함, 최소 8자)를 입력해주세요."
            }
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
        disabled={!isValid || isLoading}
      >
        {isLoading ? "처리 중..." : "회원가입"}
      </Button>
      <div className="flex justify-center">
        <p className="mt-24">
          이미 계정이 있으신가요?
          <Link href="/login" className="ml-12 text-brand-primary underline">
            로그인하기
          </Link>
        </p>
      </div>
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
            onClick={handleGoogleLogin}
          >
            <Image src={ImgGoogle} alt="Google" />
          </button>
          <button
            type="button"
            className="ml-16 flex size-42 items-center justify-center rounded"
            onClick={handleKakaoLogin}
          >
            <Image src={ImgKakao} alt="Kakao" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
