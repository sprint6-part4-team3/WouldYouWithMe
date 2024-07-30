/* eslint-disable no-console */

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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error message:", error.message);
      if (error.response) {
        console.error("Axios response data:", error.response.data);
        console.error("Axios response status:", error.response.status);
        return { success: false, data: error.response.data };
      }
      if (error.request) {
        console.error("Axios request data:", error.request);
      } else {
        console.error("Axios other error:", error.message);
      }
    } else {
      console.error("Non-Axios error:");
    }
    return {
      success: false,
      data: { message: "로그인 요청 중 오류가 발생했습니다." },
    };
  }
};

export default signIn;
