"use server";

import { cookies } from "next/headers";

import instance from "@/lib/api/axios-instance";

const signUp = async (
  email: string,
  nickname: string,
  password: string,
  passwordConfirmation: string,
) => {
  try {
    const response = await instance.post(`/auth/signUp`, {
      email,
      nickname,
      password,
      passwordConfirmation,
    });

    const { data } = response;

    if (response.status === 201) {
      cookies().set("token", data.accessToken);
      cookies().set("refreshToken", data.refreshToken);

      return {
        success: true,
        user: data.user,
      };
    }
    return { success: false, data };
  } catch {
    return {
      success: false,
      data: { message: "회원가입 요청 중 오류가 발생했습니다." },
    };
  }
};

export default signUp;
