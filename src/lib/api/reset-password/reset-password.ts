import axios from "axios";

import instance from "@/lib/api/axios-instance";

const ResetPassword = async (
  passwordConfirmation: string,
  password: string,
  token: string,
) => {
  try {
    const response = await instance.patch(`/user/reset-password`, {
      passwordConfirmation,
      password,
      token,
    });

    if (response.status === 200) {
      return { success: true, data: response.data };
    }
    return { success: false, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 400) {
        return {
          success: false,
          data: error.response.data,
        };
      }
      return {
        success: false,
        data: error.response.data,
      };
    }

    return {
      success: false,
      data: {
        message: "비밀번호 재설정 중 오류가 발생했습니다.",
      },
    };
  }
};

export default ResetPassword;
