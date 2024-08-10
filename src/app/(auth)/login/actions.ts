"use server";

import axios from "axios";
import { cookies } from "next/headers";

import instance from "@/lib/api/axios-instance";

const signIn = async (email: string, password: string) => {
  try {
    const response = await instance.post(`/auth/signIn`, { email, password });

    const { data } = response;

    if (response.status === 200) {
      cookies().set("token", data.accessToken);
      cookies().set("refreshToken", data.refreshToken);
      cookies().set("userId", data.user.id);

      return { success: true };
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
