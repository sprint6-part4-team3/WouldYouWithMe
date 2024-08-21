import axios from "axios";

import instance from "@/lib/api/axios-instance";
import { ChangePasswordInput } from "@/types/auth";

const ChangePassword = async (data: ChangePasswordInput) => {
  try {
    const response = await instance.patch(`/user/password`, data);

    if (response.status === 200) {
      return { success: true, response };
    }

    return { success: false, response };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        data: error.response.data,
      };
    }

    return {
      success: false,
      data: { message: "비밀번호 변경 중 오류가 발생했습니다." },
    };
  }
};

export default ChangePassword;
