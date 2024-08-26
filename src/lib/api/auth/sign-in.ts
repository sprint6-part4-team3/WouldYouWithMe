"use server";

import axios from "axios";
import { cookies } from "next/headers";

import instance from "@/lib/api/axios-instance";

const signIn = async (email: string, password: string) => {
  try {
    const response = await instance.post(`/auth/signIn`, {
      email,
      password,
    });

    const { data } = response;

    if (response.status === 200) {
      const maxAge = 60 * 60 * 24;

      cookies().set("token", data.accessToken, { maxAge });
      cookies().set("refreshToken", data.refreshToken, { maxAge });
      cookies().set("userId", data.user.id, { maxAge });

      return { success: true, data };
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
      data: { message: "로그인 요청 중 오류가 발생했습니다." },
    };
  }
};

export default signIn;
