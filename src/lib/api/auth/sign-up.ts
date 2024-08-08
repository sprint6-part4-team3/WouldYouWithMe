import axios from "axios";

import instance from "@/lib/api/axios-instance";
import { setCookie } from "@/utils/next-cookie";

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
      await setCookie("token", data.accessToken);
      await setCookie("refreshToken", data.refreshToken);

      return {
        success: true,
        user: data.user,
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
