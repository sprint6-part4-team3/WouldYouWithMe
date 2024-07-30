"use server";

import axios from "axios";
import { cookies } from "next/headers";

const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `https://fe-project-cowokers.vercel.app/6-3/auth/signIn`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const { data } = response;

    if (response.status === 200) {
      cookies().set("token", data.accessToken);
      cookies().set("refreshToken", data.refreshToken);

      return { success: true };
    }
    return { success: false, data };
  } catch {
    return {
      success: false,
      data: { message: "로그인 요청 중 오류가 발생했습니다." },
    };
  }
};

export default signIn;
