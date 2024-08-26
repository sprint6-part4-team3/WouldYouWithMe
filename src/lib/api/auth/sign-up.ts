"use server";

import axios from "axios";
import { cookies } from "next/headers";

import instance from "@/lib/api/axios-instance";
import { SignUpResponse } from "@/types/auth";

const signUp = async (
  email: string,
  nickname: string,
  password: string,
  passwordConfirmation: string,
): Promise<SignUpResponse> => {
  try {
    const response = await instance.post(`/auth/signUp`, {
      email,
      nickname,
      password,
      passwordConfirmation,
    });

    const { data } = response;

    if (response.status === 201) {
      const maxAge = 60 * 60 * 24;

      cookies().set("token", data.accessToken, { maxAge });
      cookies().set("refreshToken", data.refreshToken, { maxAge });
      cookies().set("userNickname", data.user.nickname, { maxAge });

      return {
        success: true,
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
    }

    return { success: false, data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        data: error.response.data,
      };
    }

    return {
      success: false,
      data: { message: "회원가입 요청 중 오류가 발생했습니다." },
    };
  }
};

export default signUp;
