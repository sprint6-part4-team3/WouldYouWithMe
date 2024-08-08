import axios from "axios";

import instance from "@/lib/api/axios-instance";
import { setCookie } from "@/utils/next-cookie";

const signIn = async (email: string, password: string) => {
  try {
    const response = await instance.post(`/auth/signIn`, { email, password });

    const { data } = response;

    if (response.status === 200) {
      await setCookie("token", data.accessToken);
      await setCookie("refreshToken", data.refreshToken);
      await setCookie("userId", data.user.id);

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
