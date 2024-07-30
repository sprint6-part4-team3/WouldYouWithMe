/* eslint-disable no-console */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import FieldWrapper from "@/components/common/Form/field-wrapper";
import Input from "@/components/common/Form/input";
import loginSchema from "@/lib/schemas/auth";
import { SignInInput } from "@/types/auth";

import signIn from "../signin/actions";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInInput>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<SignInInput> = async (data) => {
    const { email, password } = data;
    const resData = await signIn(email, password);
    if (!resData.success) {
      const message =
        resData.data?.message || "로그인 실패. 다시 시도해주세요.";
      setErrorMessage(message);
      console.error("로그인 실패:", message);
    } else {
      // 로그인 성공 시, 에러 메시지 초기화
      setErrorMessage("");
      console.log("로그인 성공");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
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
      <button
        type="submit"
        className="bg-violet-primary mt-5 rounded-lg py-4 text-white"
        disabled={!isValid}
      >
        로그인
      </button>
    </form>
  );
}
